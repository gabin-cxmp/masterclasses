import { dom } from './constants.js';
import { FORMATS } from './constants.js';
import { createElement } from './utils.js';

export const generateImage = async (format, templatePath, croppedImageBase64, infos) => {
  const [width, height] = format.dimensions;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // S'assurer que les polices sont prêtes
  await document.fonts.ready;

  // Charger les polices personnalisées utilisées
  if (format.fontDate) {
    await document.fonts.load(format.fontDate); 
  }
  if (format.fontTitle) {
    await document.fonts.load(format.fontTitle); 
  }

  // Charger le fond
  const bg = new Image();
  bg.src = templatePath;
  await new Promise(resolve => (bg.onload = resolve));
  ctx.drawImage(bg, 0, 0, width, height);

  // Ajouter l'image de profil
  const img = new Image();
  img.src = croppedImageBase64;
  await new Promise(resolve => (img.onload = resolve));

  const [ppWidth, ppHeight] = format.profilePictureSize;
  const [centerX, centerY] = format.profilePictureCenteredPos;
  ctx.drawImage(
    img,
    centerX - ppWidth / 2,
    centerY - ppHeight / 2,
    ppWidth,
    ppHeight
  );

  ctx.fillStyle = '#000';
  ctx.textAlign = 'center';

  // Nom complet
  ctx.font = format.fontName;
  ctx.fillText(`${infos.firstname.toUpperCase()} ${infos.lastname.toUpperCase()}`, format.namePos[0], format.namePos[1]);

  // Date
  ctx.font = format.fontDate;
  ctx.fillText(infos.masterclassDate, format.datePos[0], format.datePos[1]);

  // Titre masterclass
  let titleText = infos.masterclassTitle;
  
  // Extraire la taille initiale de font
  let fontParts = format.fontTitle.split(' ');
  let titleFontSize = parseInt(fontParts[0]); // ex: '32px' -> 32
  let fontName = fontParts.slice(1).join(' ');

  // Réduction progressive si le titre est trop long
  if (titleText.length > 70) {
    titleFontSize -= 1;
  }

  ctx.font = `${titleFontSize}px ${fontName}`;
  ctx.fillText(titleText, format.masterclassTitlePos[0], format.masterclassTitlePos[1]);

  return canvas.toDataURL('image/png');
};

