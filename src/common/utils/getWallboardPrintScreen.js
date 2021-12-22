import html2canvas from 'html2canvas';
export const getWallboardPrintScreen = async () => {
  let wallboardDomElement = document.querySelector('.c-wallboard--new');

  const canvas = await html2canvas(wallboardDomElement);
  var base64image = canvas.toDataURL('image/png');

  var DOM_img = document.createElement('img');
  DOM_img.src = base64image;
  DOM_img.style.width = '270px';
  DOM_img.style.height = '170px';
  DOM_img.style.position = 'fixed';
  DOM_img.style.left = '100%';
  DOM_img.classList.add('canvas-to-image');

  wallboardDomElement = document.querySelector('#root');
  wallboardDomElement.appendChild(DOM_img);

  const imageDomElement = document.querySelector('.canvas-to-image');
  const canvasResized = await html2canvas(imageDomElement);
  wallboardDomElement.removeChild(imageDomElement);

  const imageResized = canvasResized.toDataURL('image/png');
  return imageResized;
};
