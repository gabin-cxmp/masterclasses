


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

export const SALONS = ["Who's next"];

export const ZONES = {
  "Who's next": ["WSN ACADEMY - HALL 1", "LE WORKSHOP"],

  
};

export const masterclassesLeTalk = [
  { name: "TEXTILE INNOVATION", time: 'DIMANCHE 6 SEPTEMBRE I 13H - 14H'},

];

export const masterclassesLeWorkshop = [
  { name: "The Power of Color: Beyond Trends, Towards Emotion", time: 'Friday March 6 | 1pm'},
  { name: "The Immersive Shift: Rethinking Retail as Experience", time: 'Friday March 6 | 3pm'},
  { name: "Algorithmic Aesthetics: How Technology Backs Your Fashion Intuitions", time: 'Monday March 9 | 1pm'},
  { name: "Fashion x Film: The Art of the Moving Image", time: 'Saturday March 7 | 3pm'},
  { name: "Fashion & Sound: When Style Meets Music", time: 'Sunday March 8 | 1pm'},
  { name: "Sports Marketing, From Stadium to Screen: The Evolution of Sports Culture & Branding", time: 'Sunday March 8 | 11am'},
  { name: "Sustainability Reimagined: From Constraint to Creation", time: 'Saturday March 7 | 1pm'},
  { name: "The Future of Fashion Weeks: Digital, Phygital & Beyond", time: 'Monday March 9 | 3pm'}
];

export const MASTERCLASSES = {
  "Who's next": {
    "LE TALK": masterclassesLeTalk,
    "LE WORKSHOP": masterclassesLeWorkshop
  }
};


export const FORMATS = [
  {
    name: 'Post',
    format: 'square',
    template: 'shared-assets/templates/speaker-kit-post.png',
    dimensions: [1080, 1350],
    profilePictureSize: [440, 543],
    profilePicturePos: [68, 587],
    titlePos: [82, 292],
    zonePos: [585,920],
    masterclassTitleX: 564,
    nameX: 564,
    fontTitle: 'bold 80px Poppins',
    fontZone: '25px Poppins',
    fontMasterclass: '25px Poppins',
    fontName: '100 44px Poppins',
    maxTitleWidth: 650,
    maxMasterclassWidth: 446
  },
  {
    name: 'Story',
    format: 'story',
    template: 'shared-assets/templates/speaker-kit-story.png',
    dimensions: [1080, 1920],
    profilePictureSize: [440, 543],
    profilePicturePos: [291, 1094],
    titlePos: [71, 548],
    zonePos: [576, 1313],
    masterclassTitleX: 554,
    nameX: 554,
    fontTitle: 'bold 80px Poppins',
    fontZone: '25px Poppins',
    fontMasterclass: '25px Poppins',
    fontName: '100 44px Poppins',
    maxTitleWidth: 650,
    maxMasterclassWidth: 446
  }

];
