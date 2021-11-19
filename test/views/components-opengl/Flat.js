import Figure from './Figure.js';

class Flat extends Figure {
  constructor(graph = null, params = {}) {
    const { background, repeat = 20,  length = 300 } = params;
    super();
    this.graph = graph;
    this.background = background;
    this.repeat = repeat;
    this.length = length;
    this.width = params.width || length;
    this.color = params.color ? params.color : 0xffffff;
  }

  create() {
    /*const floor = this.background ? this.background : import('../assets/floor.jpg');
    const textureLoader = new THREE.TextureLoader();

    const floorTexture = textureLoader.load(floor);
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(this.repeat, this.repeat);*/

    const planeGeometry = this.graph.createFigure({
      geometry: 'PlaneGeometry',
      attributes: [this.width, this.length],
      material: { type: 'basic', color: this.color || "pink" },
      positions: this.positions,
    });

    planeGeometry.figure.rotation.x = -0.5 * Math.PI;
    planeGeometry.figure.position.x = 0;
    planeGeometry.figure.position.y = 0;
    planeGeometry.figure.position.z = 0;

    const figure = this.graph.createFigure({ geometry: 'Object3D' });
    figure.add(planeGeometry);

    return figure;
  }
}

export default Flat;
