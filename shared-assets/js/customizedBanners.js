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
  const masterclassX = format.masterclassTitleX;
  const lineHeight = parseInt(format.fontMasterclass.split(' ')[0]);
  const maxWidth = format.maxMasterclassWidth;

  // Calculate total lines for masterclass title
  const masterclassTitle = infos.masterclassTitle.toUpperCase();
  const titleWords = masterclassTitle.split(' ');
  let currentWidth = 0;
  let titleLineCount = 1;

  for (let i = 0; i < titleWords.length; i++) {
    const wordWidth = ctx.measureText(titleWords[i] + ' ').width;
    if (currentWidth + wordWidth > maxWidth && i > 0) {
      titleLineCount++;
      currentWidth = wordWidth;
    } else {
      currentWidth += wordWidth;
    }
  }

  // Calculate total lines for masterclass dates
  const masterclassDate = infos.masterclassDate.toUpperCase();
  const dateWords = masterclassDate.split(' ');
  currentWidth = 0;
  let dateLineCount = 1;

  for (let i = 0; i < dateWords.length; i++) {
    const wordWidth = ctx.measureText(dateWords[i] + ' ').width;
    if (currentWidth + wordWidth > maxWidth && i > 0) {
      dateLineCount++;
      currentWidth = wordWidth;
    } else {
      currentWidth += wordWidth;
    }
  }

  let date2LineCount = 0;
  if (infos.masterclassDate2) {
    const masterclassDate2 = infos.masterclassDate2.toUpperCase();
    const date2Words = masterclassDate2.split(' ');
    currentWidth = 0;
    date2LineCount = 1;

    for (let i = 0; i < date2Words.length; i++) {
      const wordWidth = ctx.measureText(date2Words[i] + ' ').width;
      if (currentWidth + wordWidth > maxWidth && i > 0) {
        date2LineCount++;
        currentWidth = wordWidth;
      } else {
        currentWidth += wordWidth;
      }
    }
  }

  // Total lines: title lines + date lines + optional date2 lines
  const totalDateLines = dateLineCount + date2LineCount;
  const totalMasterclassLines = titleLineCount + totalDateLines;

  // Position masterclass so its bottom is 54px above zone
  const masterclassBottomY = format.zonePos[1] - 54;
  
  // Calculate Y position: bottom - (total lines * lineHeight) - 24px spacing between title and dates
  const masterclassY = masterclassBottomY - ((totalDateLines - 1) * lineHeight) - lineHeight - 24 - ((titleLineCount - 1) * lineHeight);

  // Draw title
  wrapText(ctx, masterclassTitle, masterclassX, masterclassY, maxWidth, lineHeight);

  // Draw date with 24px spacing after title
  const dateY = masterclassY + (titleLineCount * lineHeight) + 24;
  const dateText = infos.masterclassDate2 ? masterclassDate + '\n' + infos.masterclassDate2.toUpperCase() : masterclassDate;
  wrapText(ctx, dateText, masterclassX, dateY, maxWidth, lineHeight);

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
