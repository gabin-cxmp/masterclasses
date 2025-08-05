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

// 1. Upload image + ouverture croppie
dom.profilePictureUpload.addEventListener('change', () => {
  const file = dom.profilePictureUpload.files[0];
  if (!file) return;

  dom.fileNameDisplay.textContent = file.name;

  const reader = new FileReader();
  reader.onload = function (e) {
    const overlay = document.getElementById('croppieOverlay');
    const croppieContainer = document.getElementById('croppie-wrapper-popup');
    croppieContainer.innerHTML = '';

    croppieInstance = new Croppie(croppieContainer, {
      viewport: { width: 250, height: 250, type: 'circle' },
      boundary: { width: 300, height: 300 },
    });
    croppieInstance.bind({ url: e.target.result });

    overlay.classList.remove('hidden');
  };
  reader.readAsDataURL(file);
});

// 2. Validation croppie
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

    const filename = lang === 'en' ? `My ${format.tradeshow} masterclass ${format.format} format.png` : `Ma masterclass ${format.tradeshow} format ${format.format}.png`;
    const downloadBtn = createDownloadButton(imageDataUrl, filename);
    dom.imagesContainer.appendChild(downloadBtn);
  }
});

// 4. Injection des masterclass
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

//5. Preview Design + hide lang if bijorhca 
document.addEventListener('DOMContentLoaded', () => {
  const previewDesign = document.querySelector('.preview-design');

  if (window.location.href.includes('whos-next') && lang === 'en'){
    previewDesign.style.backgroundImage = "url('../shared-assets/previews/PREVIEW-SPEAKERS-EN-WHOSNEXT.jpg')";
  } else if (window.location.href.includes('whos-next') && lang === 'fr') {
    previewDesign.style.backgroundImage = "url('../shared-assets/previews/PREVIEW-SPEAKERS-FR-WHOSNEXT.jpg')";
  }
  else{
    previewDesign.style.backgroundImage = "url('../shared-assets/previews/PREVIEW-SPEAKERS-VF-BIJORHCA.jpg')";
  }
})
