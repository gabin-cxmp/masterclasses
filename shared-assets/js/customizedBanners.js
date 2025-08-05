// customizedBanners.js

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

  // Charger les polices personnalisées utilisées (si besoin)
  if (format.fontDate) {
    await document.fonts.load(format.fontDate); // exemple: '30px NeueHassDisplayRoman'
  }
  if (format.fontTitle) {
    await document.fonts.load(format.fontTitle); // exemple: '32px NeueHassDisplayRoman'
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

  // Nom complet (font système ou déjà chargée)
  ctx.font = format.fontName;
  ctx.fillText(`${infos.firstname.toUpperCase()} ${infos.lastname.toUpperCase()}`, format.namePos[0], format.namePos[1]);

  // Date (avec font custom)
  ctx.font = format.fontDate;
  ctx.fillText(infos.masterclassDate, format.datePos[0], format.datePos[1]);

  // Titre masterclass (avec font custom)
  ctx.font = format.fontTitle;
  ctx.fillText(`${infos.masterclassTitle}`, format.masterclassTitlePos[0], format.masterclassTitlePos[1]);

  return canvas.toDataURL('image/png');
};

