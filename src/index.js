import * as THREE from 'three';
import Stats from "stats-js"

// importando la figura
import Figure from './figure.js';
import WebGl from './webgl.js';
export { Figure };

/* se encarga de crear una identidad por
grafico determinado */
const graphicsCreated = {};
let numberGraphics = 0;

/* funcion que se encarga de ajustar el graficos
a como lo llegue a necesitar el cliente determinado */
const resizeGraphics = function () {
  for (let index in graphicsCreated) {
    let graph = graphicsCreated[index];
    let height = graph._domElement.clientWidth;
    let width = graph._domElement.clientHeight;
    graph._renderer.setSize(width, height);
    graph.camera.aspect = height / width;
    graph.camera.updateProjectionMatrix();
  }
};

window.addEventListener('resize', resizeGraphics);

/* funcion que se encarga de la renderizacion creadas */
const animateRenderers = function (time) {
  try {
    for (let i in graphicsCreated) {
      let graph = graphicsCreated[i];
      if (graph.multipleRender || graph.renders == 0) {
        let figures = graph._figures;
        graph.renders += 1;

        // ciclo que permite ejecutar la animacion de cada figura
        for (let j in figures)
          typeof figures[j].animation == 'function' ? figures[j].animation(time) : null;

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

/* Componente principal del Gl */
export const Gl = ({ element, width, height, color, logs = false }) => {
  try {
    let canvas = document.createElement('canvas');
    let orbit = null;

    // check if navigator support webgl
    if (!window.WebGLRenderingContext || !canvas.getContext('webgl'))
      throw 'navigator not support WebGl';

    // create screne and adding camera
    const scene = new THREE.Scene();
    if (!color == false) scene.background = new THREE.Color(color);

    // get DOM element the string
    if (typeof element == 'string') element = document.querySelector(element);

    // check if element is a element type html
    if (!element) throw 'the element html not defined';

    // ajustado la escena si es necesario
    if (element.clientWidth < width) {
      let wh = width / height;
      width = element.clientWidth;
      height = width * wh;
    }

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    element.append(renderer.domElement);

    let gl = WebGl({ scene, camera, element, renderer, orbit }); // devolviendo el cumplimineto del canvas
    numberGraphics += 1;
    graphicsCreated[numberGraphics] = gl;

    if(logs == true){
      const stats = new Stats();
      stats.showPanel(1);
      element.appendChild( stats.dom );
      gl.stats = stats;
    }

    return gl;
  } catch (error) {
    throw new Error(error);
  }
};

// agregando renderizaciones
animateRenderers();

export default Gl;
