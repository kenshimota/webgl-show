import * as THREE from 'three';

/* figura determinada */
export const Figure = ({ setId, id }) => ({
  id,
  name: null,
  figure: null,
  animation: null, // evento que se ejecuta para la animacion de la figura
  paramsCreation: {},

  // inicializa la figura
  init: function (params) {
    let { points, attributes, positions, geometry, material } = params;
    let figure = null;
    this.paramsCreation = params;

    // creting figure with points
    if (!points == false && Array.isArray(points)) {
      points = points.map(({ x, y, z }) => new THREE.Vector3(x, y, z));
      figure = new THREE.BufferGeometry().setFromPoints(points);
    }

    if (geometry != 'Line')
      figure = attributes ? new THREE[geometry](...attributes) : new THREE[geometry]();

    if (!material == false && geometry != 'Line') {
      let type = material.type;
      delete material.type;
      switch (type) {
        case 'basic':
          material = new THREE.MeshBasicMaterial(material);
          break;
        default:
          material = new THREE.MeshPhongMaterial(material);
          break;
      }

      figure = new THREE.Mesh(figure, material);
    } else if (geometry == 'Line') {
      material = new THREE.LineBasicMaterial(material);
      figure = new THREE.Line(figure, material);
    }

    this.figure = figure;
    this.name = geometry;

    // agregando la posiciones que necesita la figura determinada
    if (!positions == false) this.setPosition(positions);
  },

  // esta funcion se encarga de permite
  // que la matrix del objecto se actualize o no
  setMatrixAutoUpdate: function (option = false) {
    this.figure.matrixAutoUpdate = option;
    this.figure.updateMatrix();
  },

  // esta funcion se encarga de controlar la edicion
  // de lo elementos geometricos dentro de la figura determinada
  setAttributes: function (attributes) {
    let geometry = null;
    this.figure.geometry.dispose();
    if (this.name != 'Line')
      geometry = attributes ? new THREE[this.name](...attributes) : new THREE[this.name]();
    this.figure.geometry = geometry;
  },

  // funcion que se ocupa de las escalas
  setScale: function (scale) {
    for (let index in scale) this.figure.scale[index] = scale[index];
  },

  // se de posicion de escalas
  setPosition: function (positions) {
    for (let index in positions) this.figure.position[index] = positions[index];
  },

  // agregando un hijo
  add: function (resource) {
    this.figure.add(resource.figure);
    setId(resource.id, resource);
  },
});

export default Figure;
