import WebGl from '../../cdn/index.js';
import { app } from './geomtry.js';

app();

/* funcion del programa */
const main = function () {
  // creando graficos en blanco
  const graph = WebGl({
    element: '#test1',
    width: 600,
    height: 600,
    color: 0x444444,
  });

  const orbitSun = graph.createFigure({ geometry: 'Object3D', positions: { z: 5 } });
  graph.addFigure(orbitSun);

  // creando el sol  como figura
  const sun = graph.createFigure({
    geometry: 'SphereGeometry',
    material: { emissive: 'yellow' },
    attributes: [1, 20, 20],
  });
  sun.setScale({ x: 3, y: 3, z: 3 });
  orbitSun.add(sun);

  const orbitEarth = graph.createFigure({ geometry: 'Object3D', positions: { x: 7 } });
  orbitSun.add(orbitEarth);
  const earth = graph.createFigure({
    geometry: 'SphereGeometry',
    material: { emissive: 'blue' },
    attributes: [0.8, 20, 20],
  });
  earth.setScale(0.6, 0.8, 0.8);
  orbitEarth.add(earth);

  const orbitMoon = graph.createFigure({ geometry: 'Object3D', positions: { x: 1.5 } });
  orbitEarth.add(orbitMoon);
  const moon = graph.createFigure({
    geometry: 'SphereGeometry',
    material: { emissive: 0x666666 },
    attributes: [0.2, 20, 20],
  });
  moon.setScale(0.5, 0.5, 0.5);
  orbitMoon.add(moon);

  const orbitMart = graph.createFigure({ geometry: 'Object3D', positions: { z: 5 } });
  graph.addFigure(orbitMart);

  const mart = graph.createFigure({
    geometry: 'SphereGeometry',
    material: { color: 'red' },
    attributes: [1, 20, 20],
    positions: { x: 13 },
  });
  orbitMart.add(mart);

  mart.animation = function () {
    this.figure.rotation.y += 0.01;
  };

  orbitMart.animation = function () {
    this.figure.rotation.y += 0.009;
  };

  const orbitAnimation = function () {
    this.figure.rotation.y += this.id / 100;
  };

  // agregando iluminacion al efecto en 3D
  graph.setLight({ intensity: 1, color: 0xffffff, position: { x: 1, y: 2, z: 1 } });
  sun.animation = orbitAnimation;
  earth.animation = orbitAnimation;
  moon.animation = orbitAnimation;
  orbitSun.animation = orbitAnimation;
  orbitEarth.animation = orbitAnimation;
  orbitMoon.animation = orbitAnimation;

  graph.camera.position.set(0, 20, 0);
  graph.camera.up.set(0, 0, 1);
  graph.camera.lookAt(0, 0, 0);
};

/*const Points = function () {
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

const Test = async function () {
  const graph = WebGl({
    width: 500,
    height: 600,
    element: '#test1',
    color: 0xffffff,
  });

  const text = await graph.createText({
    text: 'Hola Erik',
    material: { color: 'purple' },
    position: { x: 0, y: 0, z: 0 },
    params: {
      size: 2,
      height: 2,
      curveSegments: 3,
      bevelEnabled: true,
      bevelThickness: 2,
      bevelSize: 1,
      bevelOffset: 0,
      bevelSegments: 2,
    },
  });

  // animacion del texto
  text.animation = function () {
    this.figure.rotation.x += 0.01;
    this.figure.rotation.y += 0.03;
    this.figure.position.z -= 0.01;
  };

  const figure = graph.createFigure({
    geometry: 'ConeGeometry',
    material: { color: 0xff00ff },
  });

  const figure2 = graph.createFigure({
    geometry: 'ConeGeometry',
    material: { color: 0x00ff00 },
  });

  figure2.figure.position.x = -2;
  figure2.figure.position.y = 1;

  // creando animacion de la figura 2
  figure2.animation = function () {
    this.figure.rotation.x += 0.01;
    this.figure.rotation.y += 0.02;
  };

  // creando una rotacion del 3d del cubo
  figure.animation = function () {
    this.figure.rotation.x += 0.03;
    this.figure.rotation.y += 0.03;
  };

  graph.setLight({
    color: 0xffffff,
    intensity: 1,
    position: { x: -1, y: 2, z: 4 },
  });

  figure.setPosition({ x: 1, y: 1, z: 1 });
  figure2.setPosition({ x: -1, y: 1, z: 1 });

  console.log(text);

  graph.addFigure(figure);
  graph.addFigure(figure2);
  graph.addFigure(text);
};

Test();

/*Points();
Cube();
Circle();
Cone();*/
