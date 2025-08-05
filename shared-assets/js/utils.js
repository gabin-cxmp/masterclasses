// utils.js

document.querySelectorAll('nav a').forEach(link => {
    if (link.href === window.location.href) link.classList.add('active');
  });
  
export const createElement = (tag, attributes = {}) => {
  const element = document.createElement(tag);
  Object.entries(attributes).forEach(([key, value]) => {
    if (key.startsWith('data-') || !(key in element)) {
      element.setAttribute(key, value);
    } else {
      element[key] = value;
    }
  });
  return element;
};
  
export const createDownloadButton = (imageURL, fileName) => 
    createElement('a', { href: imageURL, download: fileName, textContent: 'Download', className: 'download-button-small' });
  
export const createImageTitleAndDescription = (title, description) => {
    const container = createElement('div', { className: 'image-title-container' });
    container.append(createElement('h3', { textContent: title }), createElement('p', { textContent: description }));
    return container;
  };

export function injectMasterclasses(selectElement, masterclasses) {
    masterclasses.forEach(({ name, time }) => {
      const option = document.createElement("option");
      option.value = name;
      option.textContent = name;
      option.dataset.time = time;
      selectElement.appendChild(option);
    });
}
