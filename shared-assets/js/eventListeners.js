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

// Fonction utilitaire pour redimensionner l'image avant Croppie
function resizeImageBeforeCrop(file, maxWidth = 800, quality = 0.8) {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = function() {
      // Calculer les nouvelles dimensions en gardant le ratio
      let { width, height } = img;
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      
      canvas.width = width;
      canvas.height = height;
      
      // Dessiner l'image redimensionnée
      ctx.drawImage(img, 0, 0, width, height);
      
      // Retourner le dataURL avec compression
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    
    img.src = URL.createObjectURL(file);
  });
}

// Fonction pour détruire proprement l'instance Croppie
function destroyCroppieInstance() {
  if (croppieInstance) {
    try {
      croppieInstance.destroy();
    } catch (e) {
      console.warn('Erreur lors de la destruction de Croppie:', e);
    }
    croppieInstance = null;
  }
}

// 1. Upload image + ouverture croppie (OPTIMISÉ)
dom.profilePictureUpload.addEventListener('change', async () => {
  const file = dom.profilePictureUpload.files[0];
  if (!file) return;

  // Vérifier la taille du fichier (limiter à 5MB)
  if (file.size > 5 * 1024 * 1024) {
    alert(lang === 'en' ? 'File too large. Please choose an image under 5MB.' : 'Fichier trop volumineux. Veuillez choisir une image de moins de 5MB.');
    return;
  }

  dom.fileNameDisplay.textContent = file.name;

  // Afficher le loader pendant le traitement
  document.getElementById('image-loader').style.display = 'flex';

  // Détruire l'ancienne instance si elle existe
  destroyCroppieInstance();

  try {
    // Redimensionner l'image AVANT de l'envoyer à Croppie
    const resizedImageUrl = await resizeImageBeforeCrop(file);
    
    const overlay = document.getElementById('croppieOverlay');
    const croppieContainer = document.getElementById('croppie-wrapper-popup');
    croppieContainer.innerHTML = '';

    // Configuration optimisée de Croppie
    croppieInstance = new Croppie(croppieContainer, {
      viewport: { width: 250, height: 250, type: 'circle' },
      boundary: { width: 300, height: 300 },
      // Options de performance
      enableExif: false, // Désactive la lecture EXIF (plus rapide)
      enableOrientation: false, // Désactive l'orientation automatique
      enableZoom: true,
      enableResize: false, // Désactive le redimensionnement du viewport
      mouseWheelZoom: 'ctrl', // Zoom uniquement avec Ctrl+molette
    });

    // Bind avec un délai pour laisser le DOM se mettre à jour
    requestAnimationFrame(() => {
      croppieInstance.bind({ 
        url: resizedImageUrl,
        // Zoom initial optimisé
        zoom: 0
      });
      
      // Masquer le loader et afficher l'overlay
      document.getElementById('image-loader').style.display = 'none';
      overlay.classList.remove('hidden');
    });

  } catch (error) {
    console.error('Erreur lors du traitement de l\'image:', error);
    document.getElementById('image-loader').style.display = 'none';
    alert(lang === 'en' ? 'Error processing image. Please try another file.' : 'Erreur lors du traitement de l\'image. Veuillez essayer un autre fichier.');
  }
});

// 2. Validation croppie (OPTIMISÉ)
dom.validateCropBtn.addEventListener('click', async () => {
  const overlay = document.getElementById('croppieOverlay');

  if (!croppieInstance) return;

  try {
    // Utiliser des paramètres optimisés pour le résultat
    croppedResult = await croppieInstance.result({
      type: 'base64',
      size: { width: 500, height: 500 },
      format: 'png',
      quality: 0.9, // Compression légère
      circle: true // GARDER le masque circulaire
    });

    overlay.classList.add('hidden');
    
    // Détruire l'instance après utilisation pour libérer la mémoire
    setTimeout(() => {
      destroyCroppieInstance();
    }, 100);
    
  } catch (error) {
    console.error('Erreur lors du crop:', error);
    alert(lang === 'en' ? 'Error cropping image. Please try again.' : 'Erreur lors du recadrage. Veuillez réessayer.');
  }
});

// 3. Génération images formats multiples (avec gestion d'erreur améliorée)
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

  try {
    // Traitement séquentiel avec un petit délai pour éviter le blocage
    for (let i = 0; i < formatsToUse.length; i++) {
      const format = formatsToUse[i];
      const template = lang === 'en' ? format.templateEN || format.templateFR : format.templateFR;

      if (!template) continue;

      // Petite pause entre chaque génération pour éviter le blocage UI
      if (i > 0) {
        await new Promise(resolve => setTimeout(resolve, 50));
      }

      const imageDataUrl = await generateImage(format, template, croppedResult, infos);

      const imgEl = document.createElement('img');
      imgEl.src = imageDataUrl;
      imgEl.loading = 'lazy'; // Lazy loading pour les performances
      dom.imagesContainer.appendChild(imgEl);

      const filename = lang === 'en' 
        ? `My ${format.tradeshow} Talk ${format.format} format.png` 
        : `Mon Talk ${format.tradeshow} format ${format.format}.png`;
      const downloadBtn = createDownloadButton(imageDataUrl, filename);
      dom.imagesContainer.appendChild(downloadBtn);
    }
  } catch (error) {
    console.error('Erreur lors de la génération:', error);
    alert(lang === 'en' ? 'Error generating images. Please try again.' : 'Erreur lors de la génération. Veuillez réessayer.');
  } finally {
    document.getElementById('image-loader').style.display = 'none';
  }

  dom.imagesContainer.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
});

// Nettoyage automatique quand on quitte la page
window.addEventListener('beforeunload', () => {
  destroyCroppieInstance();
});

// Event listener pour fermer le modal (si bouton de fermeture)
document.addEventListener('click', (e) => {
  if (e.target.closest('#croppieOverlay') && !e.target.closest('#croppie-wrapper-popup')) {
    const overlay = document.getElementById('croppieOverlay');
    overlay.classList.add('hidden');
    destroyCroppieInstance();
  }
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

  if (window.location.href.includes('whos-next') && lang === 'en'){
    previewDesign.style.backgroundImage = "url('../shared-assets/previews/PREVIEW-SPEAKERS-EN-WHOSNEXT.jpg')";
  } else if (window.location.href.includes('whos-next') && lang === 'fr') {
    previewDesign.style.backgroundImage = "url('../shared-assets/previews/PREVIEW-SPEAKERS-FR-WHOSNEXT.jpg')";
  } else {
    previewDesign.style.backgroundImage = "url('../shared-assets/previews/PREVIEW-SPEAKERS-VF-BIJORHCA.jpg')";
  }
});