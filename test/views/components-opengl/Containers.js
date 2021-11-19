import Figure from './Figure';
import Boxes from './Boxes';

class Containers extends Figure {
  constructor(graph, params) {
    super();
    this.graph = graph;
    this.height = params.height ? params.height : 400;
    this.width = params.width ? params.width : 400;
    this.length = params.length ? params.length : 400;
    this.map = params.map ? params.map : null;
    this.color = params.color ? params.color : null;
  }

  create() {
    const graph = this.graph;
    const containerWall = this.width * 0.05;
    this.containerWall = containerWall;

    const wallTailResource = new Boxes(graph, {
      height: containerWall,
      width: this.width,
      length: this.length,
      color: this.color,
      map: this.map,
      withParent: false,
    });

    const wallTail = wallTailResource.render();



    const wallLeftResource = new Boxes(graph, {
      height: this.height,
      width: containerWall,
      length: this.length,
      color: this.color,
      map: this.map,
      withParent: false,
    });

    const wallLeft = wallLeftResource.render();

    const wallRightResource = new Boxes(graph, {
      height: this.height,
      width: containerWall,
      length: this.length,
      color: this.color,
      map: this.map,
      withParent: false,
    });
    const wallRight = wallRightResource.render();

    const wallBottomResource = new Boxes(graph, {
      height: this.height,
      width: containerWall,
      length: this.width - containerWall * 2,
      color: this.color,
      map: this.map,
      withParent: false,
    });
    const wallBottom = wallBottomResource.render();

    // change rotation walls
    wallRight.figure.rotation.x += Math.PI / 2;
    wallRight.figure.rotation.x += Math.PI / 2;
    wallBottom.figure.rotation.y += Math.PI / 2;

    // set position walls
    wallRight.figure.position.x += this.width / 2 - containerWall / 2;
    wallLeft.figure.position.x -= this.width / 2 - containerWall / 2;
    wallBottom.figure.position.z -= this.length / 2 - containerWall / 2;
    wallTail.figure.position.y -= this.height / 2 + containerWall / 2;


    const figure = graph.createFigure({ geometry: 'Object3D' });
    figure.add(wallLeft);
    figure.add(wallRight);
    figure.add(wallBottom);
    figure.add(wallTail);

    const container = graph.createFigure({ geometry: "Object3D" });
    container.add(figure);

    return container;
  }
}

export default Containers;
