import { loadFont } from './loadFont.js';
import Figure from './figure.js';

/* componente WebGl */
export const WebGl = ({ renderer, scene, element, camera, orbit }) => ({
  _scene: scene,
  camera: camera,
  _orbit: null,
  multipleRender: true,
  _renderer: renderer,
  _domElement: element,
  _figures: {}, // coleccion de figuras determinadas
  numberFigures: 0,
  renders: 0, // no ha tenido ni su primera renderización
  _light: [], // contiene la iluminacion en la escena

  // funcion que se encargar
  setLight: function ({ intensity, color, position }) {
    try {
      const light = new THREE.DirectionalLight(color, intensity);
      for (let index in position) light.position[index] = position[index];
      this._scene.add(light);
      this._light.push(light);
    } catch (error) {
      throw new Error(error);
    }
  },

  // le da una identidad para hacer
  // la animacion de cada figura de forma idenpendide
  setId: function (id, figure) {
    try {
      if (this._figures[id]) throw `you cant'n repeat a identity the figure (${id})`;
      this._figures[id] = figure;
    } catch (error) {
      throw new Error(error);
    }
  },

  // funcion que te permite agregar una
  // figura determinada a la escena determinada
  addFigure: function (resource) {
    try {
      if (!resource) throw 'resource not defined';

      this.setId(resource.id, resource);
      this._scene.add(resource.figure);
    } catch (error) {
      throw new Error(error);
    }
  },

  // funcion que se encarga de
  createText: async function ({ text, fontUrl, params, material, position }) {
    let figure = null;
    let font = await loadFont(
      fontUrl
        ? fontUrl
        : 'https://threejsfundamentals.org/threejs/resources/threejs/fonts/helvetiker_regular.typeface.json'
    );

    figure = new THREE.TextGeometry(text, { ...params, font });
    material = new THREE.MeshPhongMaterial(material);
    let mesh = new THREE.Mesh(figure, material);
    figure.computeBoundingBox();
    figure.boundingBox.getCenter(mesh.position).multiplyScalar(-1);

    // creando la figura padre
    const parent = new THREE.Object3D();
    parent.add(mesh);
    figure = parent;

    // estableciendo posicion
    for (let index in position) figure.position[index] = position[index];

    this.numberFigures += 1;
    return Figure({ id: this.numberFigures, name: 'TextGeometry', figure });
  },

  // funcion que te permite crear un figura geometrica
  createFigure: function (params) {
    try {
      let figure = null;
      this.numberFigures += 1;

      figure = Figure({
        id: this.numberFigures,
        setId: (id, resource) => this.setId(id, resource),
      });

      figure.init(params);

      return figure;
    } catch (error) {
      throw new Error(error);
    }
  },

  // renderizacion
  render: function () {
    this._renderer.render(this._scene, this.camera);
    this.renders = this.renders + 1;
  },
});

export default WebGl;
