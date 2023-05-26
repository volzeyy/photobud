async function processImage(image) {
  const response = await fetch(image);
  const blob = await response.blob();
  return blob;
}

export default processImage;
