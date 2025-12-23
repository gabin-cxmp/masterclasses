import {
  dom,
  FORMATS,
  SALONS,
  ZONES,
  MASTERCLASSES,
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

      // Destroy previous croppie instance if exists
      if (croppieInstance) {
        try {
          croppieInstance.destroy();
        } catch (e) {
          // Ignore destroy errors
        }
        croppieInstance = null;
      }

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
        viewport: { width: 250, height: 250, type: 'square' },
        boundary: { width: 300, height: 300 },
        enableResize: false, // Pas de redimensionnement du carré
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

// 3. Génération images formats multiples
dom.submitButton.addEventListener('click', async () => {
  const selectedSalon = dom.salonSelect?.value;
  const selectedZone = dom.zoneSelect?.value;
  const masterclass = dom.masterclassSelect?.value;
  const masterclassDate = dom.masterclassSelect?.[dom.masterclassSelect.selectedIndex]?.getAttribute('data-time');
  const masterclassDate2 = dom.masterclassSelect?.[dom.masterclassSelect.selectedIndex]?.getAttribute('data-time2');
  const checks = [
    { condition: !croppedResult, message: 'Veuillez importer et recadrer votre photo.' },
    { condition: !selectedSalon, message: 'Veuillez sélectionner un salon.' },
    { condition: !selectedZone, message: 'Veuillez sélectionner une zone.' },
    { condition: !(dom.masterclassSelect?.value), message: 'Veuillez sélectionner un talk.' },
    { condition: !(dom.firstnameInput?.value), message: 'Veuillez saisir votre prénom.' },
    { condition: !(dom.lastnameInput?.value), message: 'Veuillez saisir votre nom.' }
  ];

  for (const check of checks) {
    if (check.condition) {
      alert(check.message);
      return;
    }
  }

  const infos = {
    firstname: dom.firstnameInput.value.trim(),
    lastname: dom.lastnameInput.value.trim(),
    masterclassDate: masterclassDate ? masterclassDate.trim() : '',
    masterclassDate2: masterclassDate2 ? masterclassDate2.trim() : '',
    masterclassTitle: masterclass.trim(),
    salon: selectedSalon,
    zone: selectedZone
  };

  dom.imagesContainer.innerHTML = '';
  dom.generatedImagesSection.style.display = 'block';

  document.getElementById('image-loader').style.display = 'flex';

  // Générer tous les formats
  for (const format of FORMATS) {
    const imageDataUrl = await generateImage(format, format.template, croppedResult, infos);

    // Create container div for image and button
    const containerDiv = document.createElement('div');
    containerDiv.className = 'image-container';

    const imgEl = document.createElement('img');
    imgEl.src = imageDataUrl;
    containerDiv.appendChild(imgEl);

    const filename = `Masterclass ${format.name}.png`;
    const downloadBtn = createDownloadButton(imageDataUrl, filename);
    containerDiv.appendChild(downloadBtn);

    dom.imagesContainer.appendChild(containerDiv);
  }

  document.getElementById('image-loader').style.display = 'none';

  dom.imagesContainer.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
});

// 4. Populate selects and event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Populate salon select
  SALONS.forEach(salon => {
    const option = document.createElement('option');
    option.value = salon;
    option.textContent = salon;
    dom.salonSelect.appendChild(option);
  });

  // Event listener for salon change
  dom.salonSelect.addEventListener('change', () => {
    const selectedSalon = dom.salonSelect.value;
    dom.zoneSelect.innerHTML = '<option value="">Sélectionnez une zone</option>';
    dom.masterclassSelect.innerHTML = '<option value="">Sélectionnez votre talk</option>';
    if (selectedSalon && ZONES[selectedSalon]) {
      ZONES[selectedSalon].forEach(zone => {
        const option = document.createElement('option');
        option.value = zone;
        option.textContent = zone;
        dom.zoneSelect.appendChild(option);
      });
    }
  });

  // Event listener for zone change
  dom.zoneSelect.addEventListener('change', () => {
    const selectedSalon = dom.salonSelect.value;
    const selectedZone = dom.zoneSelect.value;
    dom.masterclassSelect.innerHTML = '';
    if (selectedSalon && selectedZone && MASTERCLASSES[selectedSalon] && MASTERCLASSES[selectedSalon][selectedZone]) {
      injectMasterclasses(dom.masterclassSelect, MASTERCLASSES[selectedSalon][selectedZone]);
    } else {
      dom.masterclassSelect.innerHTML = '<option value="">Sélectionnez votre talk</option>';
    }
  });
});

// Image compression function for performance optimization
function compressImage(file) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      try {
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
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    img.src = URL.createObjectURL(file);
  });
}
