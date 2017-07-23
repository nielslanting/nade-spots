/* eslint-disable */

var cache = {};

const generateTile = (name, sourceImg, tileSize, coord, zoom, ownerDocument = document) => {
  const id = `${name}/${coord.x}/${coord.y}/${zoom}`;

  // Return the result if it has been generated before
  if (cache[id]) {
    return cache[id];
  }

  var c = Math.pow(2, zoom);
  var tilex=coord.x,tiley=coord.y;
  if (this.imageWraps) {
    if (tilex<0) tilex=c+tilex%c;
    if (tilex>=c) tilex=tilex%c;
    if (tiley<0) tiley=c+tiley%c;
    if (tiley>=c) tiley=tiley%c;
  }
  else {
    if ((tilex<0)||(tilex>=c)||(tiley<0)||(tiley>=c))
    {
      var blank = ownerDocument.createElement('DIV');
      blank.style.width = tileSize.width + 'px';
      blank.style.height = tileSize.height + 'px';
      return blank;
    }
  }

  var img = ownerDocument.createElement('img');

  img.id = "t_" + zoom + "_" + tilex + "_" + tiley;
  img.style.width = tileSize.width + 'px';
  img.style.height = tileSize.height + 'px';

  var canvas = ownerDocument.createElement('canvas');
  canvas.width = tileSize.width;
  canvas.height = tileSize.height
  var ctx = canvas.getContext("2d");
  ctx.drawImage(sourceImg,
    sourceImg.width / Math.pow(2, zoom) * tilex,
    sourceImg.height / Math.pow(2, zoom) * tiley,
    sourceImg.width / Math.pow(2, zoom),
    sourceImg.height / Math.pow(2, zoom),
    0,
    0,
    tileSize.width,
    tileSize.height
  );

  const dataUrl = canvas.toDataURL();
  cache[id] = dataUrl;
  return dataUrl;

}

export default generateTile
