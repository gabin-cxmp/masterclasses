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
  const fontsToLoad = [format.fontTitle, format.fontZone, format.fontMasterclass, format.fontName].filter(f => f);
  for (const font of fontsToLoad) {
    await document.fonts.load(font);
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
  const [ppX, ppY] = format.profilePicturePos;
  ctx.drawImage(img, ppX - ppWidth / 2, ppY - ppHeight / 2, ppWidth, ppHeight);

  ctx.fillStyle = '#000';

  // Titre (align left)
  ctx.textAlign = 'left';
  ctx.font = format.fontTitle;
  const titleText = "Je serai speaker sur " + infos.salon;
  const titleLineHeight = parseInt(format.fontTitle.split(' ')[1]) || 80;
  const titleY = infos.salon === "Salon International de la Lingerie" ? format.titlePos[1] - 40 : format.titlePos[1];
  wrapText(ctx, titleText, format.titlePos[0], titleY, format.maxTitleWidth, titleLineHeight);

  // Zone
  ctx.font = format.fontZone;
  const zoneText = infos.zone.toUpperCase();
  const zoneWidth = ctx.measureText(zoneText).width;
  ctx.fillText(zoneText, format.zonePos[0], format.zonePos[1]);

  // Calculate masterclass position dynamically
  ctx.font = format.fontMasterclass;
  const masterclassText = infos.masterclassTitle.toUpperCase() + '\n' + infos.masterclassDate.toUpperCase() + (infos.masterclassDate2 ? '\n' + infos.masterclassDate2.toUpperCase() : '');
  const masterclassX = format.masterclassTitleX;
  const lineHeight = parseInt(format.fontMasterclass.split(' ')[0]);

  // Calculate total lines for masterclass text
  const masterclassLines = masterclassText.split('\n');
  let totalMasterclassLines = 0;
  const maxWidth = format.maxMasterclassWidth;

  for (const line of masterclassLines) {
    const words = line.split(' ');
    let currentWidth = 0;
    let lineCount = 1;

    for (let i = 0; i < words.length; i++) {
      const wordWidth = ctx.measureText(words[i] + ' ').width;
      if (currentWidth + wordWidth > maxWidth && i > 0) {
        lineCount++;
        currentWidth = wordWidth;
      } else {
        currentWidth += wordWidth;
      }
    }
    totalMasterclassLines += lineCount;
  }

  // Position masterclass so its bottom is 60px above zone
  const masterclassBottomY = format.zonePos[1] - 54;
  const masterclassY = masterclassBottomY - ((totalMasterclassLines - 1) * lineHeight);

  wrapText(ctx, masterclassText, masterclassX, masterclassY, maxWidth, lineHeight);

  // Name position: baseline 32px above masterclass start
  ctx.font = 'bold 44px Antonio';
  const nameY = masterclassY - 48;
  const nameText = `${infos.firstname.charAt(0).toUpperCase() + infos.firstname.slice(1).toLowerCase()} ${infos.lastname.charAt(0).toUpperCase() + infos.lastname.slice(1).toLowerCase()}`;
  ctx.fillText(nameText, format.nameX, nameY);

  return canvas.toDataURL('image/png');
};

// Helper function to wrap text
function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const lines = text.split('\n');
  let currentY = y;

  for (const originalLine of lines) {
    const words = originalLine.split(' ');
    let line = '';

    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && i > 0) {
        ctx.fillText(line.trim(), x, currentY);
        line = words[i] + ' ';
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line.trim(), x, currentY);
    currentY += lineHeight;
  }
}
