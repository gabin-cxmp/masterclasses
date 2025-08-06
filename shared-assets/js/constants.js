// constants.js

export const dom = {
  profilePictureUpload: document.getElementById('logoUpload'),
  firstnameInput: document.getElementById('firstname'),
  lastnameInput: document.getElementById('lastname'),
  masterclassTitleInput: document.getElementById('masterclassTitle'),
  masterclassInputWrapper: document.getElementById('masterclassInputWrapper'),
  generatedImagesSection: document.querySelector('.generated-images'),
  imagesContainer: document.querySelector('.images-container'),
  fileNameDisplay: document.querySelector('.file-name'),
  submitButton: document.getElementById('submitButton'),
  previewDesign: document.querySelector('.preview-design'),
  selectRole: document.querySelector('#role-select'),
  selectMasterclass: document.getElementById('masterclass-select'),
  croppieWrapper: document.getElementById('croppie-wrapper'),
  validateCropBtn : document.getElementById('validateCropBtn')
};

export const FORMATS = [
  {
    format: 'square',
    tradeshow: "Who's Next",
    templateEN: '../shared-assets/templates/speaker-whosnext-en.png',
    templateFR: '../shared-assets/templates/speaker-whosnext-fr.png',
    dimensions: [1080, 1080],
    profilePictureCenteredPos: [540, 403],
    profilePictureSize: [316, 316],
    namePos: [540, 646],
    datePos: [540, 803],
    masterclassTitlePos: [540, 770],
    fontName: '100 44px Antonio',
    fontDate: '24px NeueHassDisplayRoman',
    fontTitle: '32px NeueHassDisplayRoman',
  },
  {
    format: 'story',
    tradeshow: "Who's Next",
    templateEN: '../shared-assets/templates/speaker-whosnext-story-en.png',
    templateFR: '../shared-assets/templates/speaker-whosnext-story-fr.png',
    dimensions: [1080, 1920],
    profilePictureCenteredPos: [540, 467],
    profilePictureSize: [316, 316],
    namePos: [540, 704],
    datePos: [540, 848],
    masterclassTitlePos: [540, 815],
    fontName: '100 44px Antonio',
    fontDate: '24px NeueHassDisplayRoman',
    fontTitle: '32px NeueHassDisplayRoman'
  },
  {
    format: 'square',
    tradeshow: "Bijorhca",
    templateFR: '../shared-assets/templates/speaker-bijorhca-fr.png',
    dimensions: [1080, 1080],
    profilePictureCenteredPos: [540, 403],
    profilePictureSize: [316, 316],
    namePos: [540, 646],
    datePos: [540, 803],
    masterclassTitlePos: [540, 770],
    fontName: '100 44px Antonio',
    fontDate: '24px NeueHassDisplayRoman',
    fontTitle: '32px NeueHassDisplayRoman',
  },
  {
    format: 'story',
    tradeshow: "Bijorhca",
    templateFR: '../shared-assets/templates/speaker-bijorhca-story-fr.png',
    dimensions: [1080, 1920],
    profilePictureCenteredPos: [540, 467],
    profilePictureSize: [316, 316],
    namePos: [540, 704],
    datePos: [540, 848],
    masterclassTitlePos: [540, 815],
    fontName: '100 44px Antonio',
    fontDate: '24px NeueHassDisplayRoman',
    fontTitle: '32px NeueHassDisplayRoman'
  },
];

export const masterclassesWhosNextFR = [
  { name: 'Économie circulaire et innovation : repenser la production textile', time: 'samedi 6 septembre : 13h00 - 14h00'},
  { name: 'Le savoir-faire Européen, un atout local de processus engagé', time: 'samedi 6 septembre : 14h00 - 15h00'},
  { name: 'Mode & Océans : une industrie face à son impact', time: 'samedi 6 septembre : 15h00 - 16h00'},
  { name: 'Innovation textiles', time: 'samedi 6 septembre : 16h00 - 17h00'},
  { name: 'Gamme de couleur hiver 2026-2027 : son décryptage et ses inspirations', time: 'dimanche 7 septembre : 11h00 - 12h00'},
  { name: "Décryptage d’une croissance du marché de l’accessoire", time: 'dimanche 7 septembre : 12h00 - 13h00'},
  { name: "Des savoir-faire d'accompagnements uniques", time: 'dimanche 7 septembre : 14h30 - 15h30' },
  { name: 'Régulations : dialogues entre créateurs, marques, industriels et pouvoirs publics', time: 'dimanche 7 septembre : 15h00 - 16h00'},
  { name: 'Microplastics, Fashion, and the fight for clean water', time: 'Sunday 7 September: 1:00 pm - 2:00 pm'},
  { name: 'Enjeux de mesure d’impact et d’affichage environnemental', time: ' lundi 8 septembre : 10h00 - 11h00'},
  { name: 'Tendances Bodywear été 2006', time: 'lundi 8 septembre : 10h00 - 11h00'},
  { name: 'L’industrie textile en eaux troubles', time: 'lundi 8 septembre : 12h00 - 13h00'},
  { name: 'Podcast La Seconde Vintage', time: 'lundi 8 septembre : 13h00 - 14h00'},
  { name: 'Comment peut-on capturer l’aura d’un bijou ou d’un être à travers l’image ?', time: 'lundi 8 septembre : 14h00 - 15h00'},
  { name: 'Comprendre les procédés de valorisation des déchets textiles', time: 'lundi 8 septembre : 14h00 - 15h00'},
  { name: 'Tisser des liens entre mode et préservation des océans', time: 'lundi 8 septembre : 15h00 - 16h00'},

];

export const masterclassesWhosNextEN = [
  { name: 'Microplastics, Fashion, and the fight for clean water', time: 'Sunday 7 September: 1:00 pm - 2:00 pm'}
]

export const masterclassesBijorhca = [
  { name: 'Le bijou comme prolongement de soi : quand l’aura inspire la création', time: 'samedi 6 septembre : 14h00 - 15h00'},
  { name: 'Lithothérapie vs gemmologie : le pouvoir des cristaux, à quel prix ?', time: 'samedi 6 septembre : 15h00 - 16h00'},
  { name: 'La mémoire du bijou : quand la matière garde l’âme', time: 'dimanche 7 septembre : 14h00 - 15h00'},
  { name: 'Géométrie sacrée : architecturer l’invisible pour révéler l’Aura', time: 'dimanche 7 septembre 15h00 - 16h00'},
  { name: 'Comment peut-on capturer l’aura d’un bijou ou d’un être à travers l’image ?', time: 'lundi 8 septembre : 14h00 - 15h00'},
  { name: 'Le bijou d’émotion, objet intime dans une société pudique…', time: 'lundi 8 septembre : 15h00 - 16h00'}
];


