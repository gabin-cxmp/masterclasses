export const dom = {
  profilePictureUpload: document.getElementById('logoUpload'),
  firstnameInput: document.getElementById('firstname'),
  lastnameInput: document.getElementById('lastname'),
  salonSelect: document.getElementById('salon-select'),
  zoneSelect: document.getElementById('zone-select'),
  masterclassSelect: document.getElementById('masterclass-select'),
  masterclassInputWrapper: document.getElementById('masterclassInputWrapper'),
  generatedImagesSection: document.querySelector('.generated-images'),
  imagesContainer: document.querySelector('.images-container'),
  fileNameDisplay: document.querySelector('.file-name'),
  submitButton: document.getElementById('submitButton'),
  previewDesign: document.querySelector('.preview-design'),
  croppieWrapper: document.getElementById('croppie-wrapper'),
  validateCropBtn: document.getElementById('validateCropBtn')
};

export const SALONS = ["Who's Next", "Bijorhca", "Salon International de la Lingerie", "Interfilière Paris"];

export const ZONES = {
  "Who's Next": ["IMPACT — 7.3", "WSN Academy — 7.3"],
  "Bijorhca": ["BIJORHCA — 7.2"],
  "Interfilière Paris": ["SOURCING & SOLUTIONS — 7.2"],
  "Salon International de la Lingerie": ["SOURCING & SOLUTIONS — 7.2"]
};

export const FORMATS = [
  {
    name: 'Post Bleu',
    format: 'square',
    template: 'shared-assets/templates/speaker-kit-blue-square.png',
    dimensions: [1080, 1080],
    profilePictureSize: [440, 440],
    profilePicturePos: [302, 702],
    titlePos: [82, 292],
    zonePos: [585,920],
    masterclassTitleX: 564,
    nameX: 564,
    fontTitle: 'bold 80px Antonio',
    fontZone: '25px Theinhard',
    fontMasterclass: '25px Theinhard',
    fontName: '100 44px Antonio',
    maxTitleWidth: 650,
    maxMasterclassWidth: 446
  },
  {
    name: 'Post Jaune',
    format: 'square',
    template: 'shared-assets/templates/speaker-kit-yellow-square.png',
    dimensions: [1080, 1080],
    profilePictureSize: [440, 440],
    profilePicturePos: [302, 702],
    titlePos: [82, 292],
    zonePos: [585,920],
    masterclassTitleX: 564,
    nameX: 564,
    fontTitle: 'bold 80px Antonio',
    fontZone: '25px Theinhard',
    fontMasterclass: '25px Theinhard',
    fontName: '100 44px Antonio',
    maxTitleWidth: 650,
    maxMasterclassWidth: 446
  },
  {
    name: 'Post Jaune',
    format: 'square',
    template: 'shared-assets/templates/speaker-kit-pink-square.png',
    dimensions: [1080, 1080],
    profilePictureSize: [440, 440],
    profilePicturePos: [302, 702],
    titlePos: [82, 292],
    zonePos: [585,920],
    masterclassTitleX: 564,
    nameX: 564,
    fontTitle: 'bold 80px Antonio',
    fontZone: '25px Theinhard',
    fontMasterclass: '25px Theinhard',
    fontName: '100 44px Antonio',
    maxTitleWidth: 650,
    maxMasterclassWidth: 446
  },
  {
    name: 'Story Bleue',
    format: 'story',
    template: 'shared-assets/templates/speaker-kit-blue-story.png',
    dimensions: [1080, 1920],
    profilePictureSize: [440, 440],
    profilePicturePos: [302, 1029],
    titlePos: [82, 540],
    zonePos: [582, 1248],
    masterclassTitleX: 561,
    nameX: 561,
    fontTitle: 'bold 80px Antonio',
    fontZone: '25px Theinhard',
    fontMasterclass: '25px Theinhard',
    fontName: '100 44px Antonio',
    maxTitleWidth: 650,
    maxMasterclassWidth: 446
  },
  {
    name: 'Story Jaune',
    format: 'story',
    template: 'shared-assets/templates/speaker-kit-yellow-story.png',
    dimensions: [1080, 1920],
    profilePictureSize: [440, 440],
    profilePicturePos: [302, 1029],
    titlePos: [82,540],
    zonePos: [582, 1248],
    masterclassTitleX: 561,
    nameX: 561,
    fontTitle: 'bold 80px Antonio',
    fontZone: '25px Theinhard',
    fontMasterclass: '25px Theinhard',
    fontName: '100 44px Antonio',
    maxTitleWidth: 650,
    maxMasterclassWidth: 446
  },
  {
    name: 'Story Rose',
    format: 'story',
    template: 'shared-assets/templates/speaker-kit-pink-story.png',
    dimensions: [1080, 1920],
    profilePictureSize: [440, 440],
    profilePicturePos: [302, 1029],
    titlePos: [82, 540],
    zonePos: [582, 1248],
    masterclassTitleX: 561,
    nameX: 561,
    fontTitle: 'bold 80px Antonio',
    fontZone: '25px Theinhard',
    fontMasterclass: '25px Theinhard',
    fontName: '100 44px Antonio',
    maxTitleWidth: 650,
    maxMasterclassWidth: 446
  }
];

export const masterclassesWhosNextImpact = [
  { name: "C'était mieux avant? Enquête sur nos vêtements au fil du temps", time: 'Samedi 17 janvier : 13h - 14h'},
  //{ name: "-", time: 'Samedi 17 janvier : 15h - 16h'},
  { name: "Et si le passé était un véritable atout stratégique pour la mode de demain ? Dépoussiérer les archives & remettre l’humain au cœur de la mode avec Griffé Studio.", time: 'Dimanche 18 janvier : 14h - 15h'},
  { name: "Navigating Textile Sustainability: GOTS Insights and Updates", time: 'Dimanche 18 Janvier : 11h - 12h'},
  { name: "Entre éthique et durabilité: pourquoi et comment les marques de mode s’engagent en faveur du bien-être animal", time: 'Lundi 19 janvier : 11h - 12h'},
  { name: "Et si la durabilité passait par la proximité?", time: 'Lundi 19 janvier : 13h - 14h'},
  { name: "La mode circulaire est-elle condamnée à être une niche de conviction face à l'essor de la fast fashion?", time: 'Lundi 19 janvier : 14h30 - 15h30'}
];

export const masterclassesWhosNextAcademy = [
  { name: "Génération Entrepreneurs 2026 : le parcours indispensable pour créer sa marque de mode & d’accessoires", time: 'Samedi 17 janvier : 11h - 11h30'},
  { name: "Le sens du développement : ce que j’aurais aimé savoir avant d’ouvrir ma deuxième boutique", time: 'Samedi 17 janvier : 14h - 14h30'},
  { name: "Lutter efficacement contre la contrefaçon dans la mode", time: 'Samedi 17 janvier : 16h - 16h30'},
  { name: "Imaginez, générez, vendez : l’IA au service des visuels e-commerce", time: 'Dimanche 18 janvier : 11h - 11h30'},
  { name: "Les outils digitaux qui boostent le business des boutiques", time: 'Dimanche 18 janvier : 14h - 14h30'},
  { name: "Réussir sa communication photo & vidéo : conseils, IA et pièges à éviter", time: 'Dimanche 18 janvier : 16h - 16h30'},
  { name: "Ambitions Internationales : les solutions de Bpifrance pour la réussite des entreprises françaises.", time: 'Lundi 19 janvier : 11h - 11h30'},
  { name: "The Trend Forward Retailer: Mastering Signals, Shifts, and Shopper Demand", time: 'Lundi 19 janvier : 14h - 14h30'},
  { name: "Les communautés : l’avenir de la mode française - par la Fédération Française du Prêt à Porter Féminin", time: 'Lundi 19 janvier : 16h - 16h30'}
];

export const masterclassesIFL = [
  { name: "Muehlmeier,les métiers du confort et du soutien", time: 'Samedi 17 janvier : 12h - 12h30'},
  { name: "Tendance Matières Premières et lingerie par Jos Berry", time: 'Dimanche 18 janvier : 9h - 9h30', time2: 'Dimanche 18 janvier : 16h30 - 17h'},
  { name: "Cintas Martell, les métiers des Finitions ( les biais et les élastiques )", time: 'Dimanche 18 janvier : 12h - 12h30'},
];

export const masterclassesSIL = [
  { name: '“Les Dessous de la culotte”  par Eloïse Gillard, rencontre Artiste', time: 'Samedi 17 janvier : 15h - 15h30'},
  { name: "Elomi, Modernisation et démocratisation de l'offre grande taille", time: 'Samedi 17 janvier : 16h - 16h30'},
  { name: "Beauté et Bien-être comme booster du marché lingerie par Maïa Mazaurette", time: 'Dimanche 18 janvier : 15h30 - 16h'},
  { name: "Le Milieu de gamme, nouveau territoire de sens et de différenciation.", time: 'Lundi 19 janvier : 11h - 11h30'},
  //{ name: "-", time: 'Lundi 19 janvier : 12h - 12h30'},
  { name: "Les Tendances sociétales et mode du Bodywear Hiver 27-28", time: 'Lundi 19 janvier : 14h - 14h30'}
];

export const masterclassesBijorhca = [
  { name: "L’amour de soi comme base pour aimer et être aimé", time: 'Samedi 17 janvier : 14h - 15h'},
  { name: "Le bijou, plus qu’un objet, une émotion : exploration de sa valeur intemporelle et émotionnelle à transmettre", time: 'Samedi 17 janvier : 15h - 16h'},
  { name: "La puissance intime du bijou : un geste comme un aveu de soi", time: 'Samedi 17 janvier : 16h - 17h'},
  { name: "L'expérience comme nouveau joyau", time: 'Dimanche 18 janvier : 14h - 15h'},
  { name: "Le bijou comme affirmation : se raconter, se révéler, se revendiquer", time: 'Dimanche 18 janvier : 15h - 16h'},
  { name: "La formation, cœur battant des métiers d’art de la bijouterie", time: 'Lundi 19 janvier : 11h - 1éh'},
  { name: "Intégrer l'IA dans votre processus de production", time: 'Lundi 19 janvier : 14h - 15h'},
  { name: "De l'idée à la propriété : protéger ses dessins, ses modèles et sa marque", time: 'Lundi 19 janvier : 15h - 16h'},
];

export const MASTERCLASSES = {
  "Who's Next": {
    "IMPACT — 7.3": masterclassesWhosNextImpact,
    "WSN Academy — 7.3": masterclassesWhosNextAcademy
  },
  "Bijorhca": {
    "BIJORHCA — 7.2": masterclassesBijorhca
  },
  "Salon International de la Lingerie": {
    "SOURCING & SOLUTIONS — 7.2": masterclassesSIL
  },
  "Interfilière Paris": {
    "SOURCING & SOLUTIONS — 7.2": masterclassesIFL
  }
};



