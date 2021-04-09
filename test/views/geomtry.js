import WebGl from '../../src/gl.js';

/* funcion que se encarga del cilindro */
const figureCylinder = function (radius, height) {
  const graph = WebGl({
    element: '#cylinder-test',
    width: 360,
    height: 360,
    color: 0xffffff,
  });

  const cylinder = graph.createFigure({
    geometry: 'CylinderGeometry',
    material: { emissive: 'blue' },
    attributes: [radius, radius, height, 12],
  });

  cylinder.animation = function () {
    this.figure.rotation.x += 0.01;
  };

  window.cylinderSet = function (d, h) {
    cylinder.setAttributes([d / 2, d / 2, h, 12]);
  };

  const object3d = graph.createFigure({ geometry: 'Object3D' });
  object3d.add(cylinder);

  graph.setLight({ intensity: 0.6, color: 0xffffff, positions: { x: 1, y: -1, z: 3 } });
  graph.setLight({ intensity: 0.3, color: 0xffffff, positions: { x: -1, y: 1, z: -3 } });
  graph.addFigure(object3d);
  graph.camera.position.set(0, 1, 10);
};

/* funcion encarga de crear un cubo */
const figureCube = function () {
  const graph = WebGl({
    element: '#box-test',
    width: 360,
    height: 360,
    color: 0xffffff,
  });

  const cube = graph.createFigure({
    geometry: 'BoxGeometry',
    material: { emissive: 'red' },
    attributes: [2, 4],
  });

  cube.animation = function () {
    this.figure.rotation.y += 0.01;
  };

  graph.setLight({ intensity: 0.4, color: 0xffffff, position: { x: -3, y: -5, z: 20 } });
  graph.addFigure(cube);

  console.log(graph);
};

export const app = function () {
  figureCylinder(1, 3);
  figureCube();
};
