import {
  dom,
  FORMATS,
  masterclassesWhosNextEN,
  masterclassesWhosNextFR,
  masterclassesBijorhca,
} from './constants.js';
import { generateImage } from './customizedBanners.js';
import { createDownloadButton, injectMasterclasses } from './utils.js';

let croppieInstance = null;
let croppedResult = null;
const lang = document.documentElement.lang;

// Detect Chrome on Mac for specific optimizations
const isChromeMac = () => {
  const userAgent = navigator.userAgent;
  return userAgent.includes('Chrome') && userAgent.includes('Mac');
};

// 1. Upload image + ouverture croppie (VERSION AMÉLIORÉE POUR CHROME MAC)
dom.profilePictureUpload.addEventListener('change', async () => {
  const file = dom.profilePictureUpload.files[0];
  if (!file) return;

  dom.fileNameDisplay.textContent = file.name;

  // Afficher le loader existant pendant le traitement
  document.getElementById('image-loader').style.display = 'flex';

  // Utiliser setTimeout pour laisser le navigateur afficher le loader
  setTimeout(async () => {
    try {
      // Check file size first (performance optimization)
      const maxSize = 10 * 1024 * 1024; // 10MB limit
      if (file.size > maxSize) {
        throw new Error('File too large. Please choose an image smaller than 10MB.');
      }

      // Prepare DOM elements early (performance optimization)
      const overlay = document.getElementById('croppieOverlay');
      const croppieContainer = document.getElementById('croppie-wrapper-popup');
      croppieContainer.innerHTML = '';

      // Step 1: Image compression optimization
      const compressedImageDataUrl = await compressImage(file);

      // Use compressed image directly instead of FileReader
      const imageDataUrl = compressedImageDataUrl;

      // Petite pause pour Chrome Mac (problème de threading) - optimisée
      if (isChromeMac()) {
        await new Promise(resolve => setTimeout(resolve, 25)); // Réduit de 50ms à 25ms
      }

      // Initialisation Croppie standard (ne pas toucher au zoom)
      croppieInstance = new Croppie(croppieContainer, {
        viewport: { width: 250, height: 250, type: 'circle' },
        boundary: { width: 300, height: 300 },
        enableResize: false, // Pas de redimensionnement du cercle
      });
      
      // Add Chrome Mac specific optimization
      if (isChromeMac()) {
        croppieInstance.options.enableExif = false; // Disable EXIF reading which can cause delays
        croppieInstance.options.mouseWheelZoom = false; // Disable mouse wheel zoom which can be slow on Chrome Mac
        croppieInstance.options.enableOrientation = false; // Disable orientation detection for better performance
      }

      // Liaison image standard
      croppieInstance.bind({ url: imageDataUrl });

      // Masquer le loader et afficher la modal
      document.getElementById('image-loader').style.display = 'none';
      overlay.classList.remove('hidden');

    } catch (error) {
      console.error('Erreur lors du chargement:', error);
      document.getElementById('image-loader').style.display = 'none';
      alert(lang === 'en' ? 
        'An error occurred while loading the image. Please try again.' : 
        'Une erreur est survenue lors du chargement de l\'image. Veuillez réessayer.'
      );
    }
  }, 100); // Délai pour laisser le loader s'afficher
});

// 2. Validation croppie (inchangé)
dom.validateCropBtn.addEventListener('click', async () => {
  const overlay = document.getElementById('croppieOverlay');

  if (!croppieInstance) return;

  croppedResult = await croppieInstance.result({
    type: 'base64',
    size: { width: 500, height: 500 },
    format: 'png',
  });

  overlay.classList.add('hidden');
});

// 3. Génération images formats multiples (inchangé)
dom.submitButton.addEventListener('click', async () => {
  const lang = document.documentElement.lang;
  const isWhosNext = window.location.href.includes('whos-next');
  const masterclass = dom.selectMasterclass?.value;
  const masterclassDate = dom.selectMasterclass?.[dom.selectMasterclass.selectedIndex].getAttribute('data-time');

  if (!croppedResult || !masterclass || !dom.firstnameInput.value || !dom.lastnameInput.value) {
    alert(lang === 'en' ? 'Please complete all fields and upload your photo.' : 'Veuillez remplir tous les champs et importer votre photo.');
    return;
  }

  const infos = {
    firstname: dom.firstnameInput.value.trim(),
    lastname: dom.lastnameInput.value.trim(),
    masterclassDate: masterclassDate.trim(),
    masterclassTitle: masterclass.trim()
  };

  dom.imagesContainer.innerHTML = '';
  dom.generatedImagesSection.style.display = 'block';

  document.getElementById('image-loader').style.display = 'flex';

  // 🔍 Filtrer les bons formats à générer
  const formatsToUse = FORMATS.filter(f => {
    return isWhosNext
      ? f.tradeshow === "Who's Next"
      : f.tradeshow === 'Bijorhca';
  });

  for (const format of formatsToUse) {
    const template =
      lang === 'en' ? format.templateEN || format.templateFR : format.templateFR;

    if (!template) continue; // skip if template doesn't exist

    const imageDataUrl = await generateImage(format, template, croppedResult, infos);

    const imgEl = document.createElement('img');
    imgEl.src = imageDataUrl;
    dom.imagesContainer.appendChild(imgEl);

    const filename = lang === 'en' ? `My ${format.tradeshow} Talk ${format.format} format.png` : `Mon Talk ${format.tradeshow} format ${format.format}.png`;
    const downloadBtn = createDownloadButton(imageDataUrl, filename);
    dom.imagesContainer.appendChild(downloadBtn);
  }

  document.getElementById('image-loader').style.display = 'none';

  dom.imagesContainer.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
});

// 4. Injection des masterclass (inchangé)
document.addEventListener('DOMContentLoaded', () => {
  if (dom.selectMasterclass) {
    if (window.location.href.includes('whos-next') && lang === 'en') {
      injectMasterclasses(dom.selectMasterclass, masterclassesWhosNextEN);
    } else if (window.location.href.includes('whos-next') && lang === 'fr') {
      injectMasterclasses(dom.selectMasterclass, masterclassesWhosNextFR);
    } else {
      injectMasterclasses(dom.selectMasterclass, masterclassesBijorhca);
    }
  }
});

// 5. Preview Design + hide lang if bijorhca (inchangé)
document.addEventListener('DOMContentLoaded', () => {
  const previewDesign = document.querySelector('.preview-design');

  if (window.location.href.includes('whos-next') && lang === 'en') {
    previewDesign.style.backgroundImage = "url('../shared-assets/previews/PREVIEW-SPEAKERS-EN-WHOSNEXT.jpg')";
  } else if (window.location.href.includes('whos-next') && lang === 'fr') {
    previewDesign.style.backgroundImage = "url('../shared-assets/previews/PREVIEW-SPEAKERS-FR-WHOSNEXT.jpg')";
  } else {
    previewDesign.style.backgroundImage = "url('../shared-assets/previews/PREVIEW-SPEAKERS-VF-BIJORHCA.jpg')";
  }
});

// Image compression function for performance optimization
function compressImage(file) {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Calculate optimal dimensions (max 1920px width/height)
      const maxSize = 1920;
      let { width, height } = img;
      
      if (width > maxSize || height > maxSize) {
        if (width > height) {
          height = (height * maxSize) / width;
          width = maxSize;
        } else {
          width = (width * maxSize) / height;
          height = maxSize;
        }
      }
      
      canvas.width = width;
      canvas.height = height;
      
      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height);
      const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.8); // 80% quality
      
      resolve(compressedDataUrl);
    };
    
    img.src = URL.createObjectURL(file);
  });
}