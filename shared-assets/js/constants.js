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

export const SALONS = ["Who's Next", "Bijorhca", "Interfilière Paris"];

export const ZONES = {
  "Who's Next": ["WSN Academy"],
  "Bijorhca": ["IMPACT and Neonyt Paris"],
    "Interfilière Paris": ["Interfilière Paris"],
  
  
};

export const masterclassesWSNACADEMY = [
  { name: "Creative Direction as a Business Strategy", time: 'Friday March 6 | 11am'},
  { name: "GenAI x Aesthetics: When Technology Becomes the New Muse", time: 'Saturday March 7 | 11am'},
  { name: "Cultural Crossroads: Local Aesthetics, Global Impact", time: 'Sunday March 8 | 11am'},
  { name: "New Faces, New Voices: The Emerging Generation", time: 'Monday 9 | 11am'},
];

export const masterclassesIMPACT = [
  { name: "Contemporary Cultural Conversations : a new era of creativity", time: 'Friday March 6 | 1pm'},
  { name: "The Immersive Shift: Rethinking Retail as Experience", time: 'Friday March 6 | 3pm'},
  { name: "Algorithmic Aesthetics: How Technology Backs Your Fashion Intuitions", time: 'Saturday March 7 | 1pm'},
  { name: "Fashion x Film: The Art of the Moving Image", time: 'Saturday March 7 | 3pm'},
  { name: "Fashion & Sound: When Style Meets Music", time: 'Sunday March 8 | 1pm'},
  { name: "Sports Marketing, From Stadium to Screen: The Evolution of Sports Culture & Branding", time: 'Sunday March 8 | 3pm'},
  { name: "Sustainability Reimagined: From Constraint to Creation", time: 'Monday 9 | 1pm'},
  { name: "The Future of Fashion Weeks: Digital, Phygital & Beyond", time: 'Monday 9 | 3pm'}
];

export const MASTERCLASSES = {
  "Who's Next": {
    "WSN Academy": masterclassesWSNACADEMY
  }
 "Bijorhca": {
    "IMPACT and Neonyt Paris": masterclassesIMPACT
  }
  "Interfilière Paris": {
    "Interfilière Paris": masterclassesIFL
  }

};


export const FORMATS = [
  {
    name: 'Post',
    format: 'square',
    template: 'shared-assets/templates/speaker-kit-post.png',
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
    name: 'Story',
    format: 'story',
    template: 'shared-assets/templates/speaker-kit-story.png',
    dimensions: [1080, 1920],
    profilePictureSize: [440, 440],
    profilePicturePos: [291, 1094],
    titlePos: [71, 548],
    zonePos: [576, 1313],
    masterclassTitleX: 554,
    nameX: 554,
    fontTitle: 'bold 80px Antonio',
    fontZone: '25px Theinhard',
    fontMasterclass: '25px Theinhard',
    fontName: '100 44px Antonio',
    maxTitleWidth: 650,
    maxMasterclassWidth: 446
  }

];
