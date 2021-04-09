// funcion que se encarga de cargar
export const loader = new THREE.FontLoader();

// promisify font loading
export const loadFont = function (url) {
  return new Promise((resolve, reject) => {
    loader.load(url, resolve, undefined, reject);
  });
};
