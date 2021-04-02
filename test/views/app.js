import WebGl from '../../src/gl.js';

const Points = function () {
  const graph = WebGl({ element: '#test1', width: 400, height: 200 });
  graph.multipleRender = false;
  graph.camera.position.set(0, 0, 100);
  graph.camera.lookAt(0, 0, 0);

  const figure1 = graph.createFigure({
    geometry: 'Line',
    material: { color: 0x0000ff },
    points: [
      { x: -10, y: 0, z: 0 },
      { x: 0, y: 10, z: 0 },
      { x: 10, y: 0, z: 0 },
    ],
  });

  graph.addFigure(figure1);
  graph.render();
};

const Cube = function () {
  const graph = WebGl({ width: 400, height: 200, element: '#test1' });

  const figure = graph.createFigure({
    geometry: 'BoxGeometry',
    material: { color: 'red' },
  });

  // creando una rotacion del 3d del cubo
  figure.animation = function () {
    this.figure.rotation.x += 0.02;
    this.figure.rotation.y += 0.05;
  };

  graph.addFigure(figure);
};

const Circle = function () {
  const graph = WebGl({ width: 400, height: 200, element: '#test1' });

  const figure = graph.createFigure({
    geometry: 'CircleGeometry',
    material: { color: 0x0000ff },
  });

  // creando una rotacion del 3d del cubo
  figure.animation = function () {
    this.figure.rotation.x += 0.02;
    this.figure.rotation.y += 0.01;
  };

  graph.addFigure(figure);
};

const Cone = function () {
  const graph = WebGl({
    width: 400,
    height: 200,
    element: '#test1',
    color: 0x444444,
  });

  const figure = graph.createFigure({
    geometry: 'ConeGeometry',
    material: { color: 0xff00ff },
  });

  // creando una rotacion del 3d del cubo
  figure.animation = function () {
    this.figure.rotation.x += 0.03;
    this.figure.rotation.y += 0.03;
  };

  graph.addFigure(figure);
};

Points();
Cube();
Circle();
Cone();
