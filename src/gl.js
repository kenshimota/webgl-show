// importando la figura
import Figure from './figure.js';
export { Figure };

/* se encarga de crear una identidad por
grafico determinado */
const graphicsCreated = {};
let numberGraphics = 0;
/* funcion que se encarga de la renderizacion creadas */
const animateRenderers = function () {
  try {
    for (let i in graphicsCreated) {
      let graph = graphicsCreated[i];
      if (graph.multipleRender || graph.renders == 0) {
        let figures = graph._figures;
        graph.renders += 1;

        // ciclo que permite ejecutar la animacion de cada figura
        for (let j in figures)
          typeof figures[j].animation == 'function' ? figures[j].animation() : null;

        // renderizacion del grafico determinado
        graph.camera.position.z = 5;
        graph.render();
      }
    }

    requestAnimationFrame(animateRenderers);
  } catch (error) {
    throw new Error(error);
  }
};

/* componente WebGl */
export const WebGl = ({ renderer, scene, element, camera }) => ({
  _scene: scene,
  camera: camera,
  multipleRender: true,
  _renderer: renderer,
  _domElement: element,
  _figures: {}, // coleccion de figuras determinadas
  numberFigures: 0,
  renders: 0, // no ha tenido ni su primera renderización

  // funcion que te permite agregar una
  // figura determinada a la escena determinada
  addFigure: function (resource) {
    try {
      if (!resource) throw 'resource not defined';
      if (this._figures[resource.id]) throw `you cant'n repeat a identity the figure (${id})`;

      this._scene.add(resource.figure);
      this._figures[resource.id] = resource;
    } catch (error) {
      throw new Error(error);
    }
  },

  // funcion que te permite crear un figura geometrica
  createFigure: function ({ points, geometry, material }) {
    try {
      let figure = null;

      // creting figure with points
      if (!points == false && Array.isArray(points)) {
        points = points.map(({ x, y, z }) => new THREE.Vector3(x, y, z));
        console.log(points);
        figure = new THREE.BufferGeometry().setFromPoints(points);
      }

      if (geometry != 'Line') figure = new THREE[geometry]();

      if (!material == false && geometry != 'Line') {
        material = new THREE.MeshBasicMaterial(material);
        figure = new THREE.Mesh(figure, material);
      } else if (geometry == 'Line') {
        material = new THREE.LineBasicMaterial(material);
        figure = new THREE.Line(figure, material);
      }

      this.numberFigures += 1;
      return Figure({ id: this.numberFigures, name: geometry, figure });
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

/* Componente principal del Gl */
export const Gl = ({ element, width, height, color }) => {
  try {
    let canvas = document.createElement('canvas');

    // check if navigator support webgl
    if (!window.WebGLRenderingContext || !canvas.getContext('webgl'))
      throw 'navigator not support WebGl';

    // create screne and adding camera
    const scene = new THREE.Scene();
    if (!color == false) scene.background = new THREE.Color(color);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);

    // check if element is a element type html
    if (!element) throw 'the element html not defined';
    else if (typeof element == 'string') element = document.querySelector(element);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    element.append(renderer.domElement);

    let gl = WebGl({ scene, camera, element, renderer }); // devolviendo el cumplimineto del canvas
    numberGraphics += 1;
    graphicsCreated[numberGraphics] = gl;
    return gl;
  } catch (error) {
    throw new Error(error);
  }
};

// agregando renderizaciones
animateRenderers();

export default Gl;
