import Figure from './Figure.js';
import Boxes from './Boxes.js';

class Pallets extends Figure {
  constructor(graph = null, params = {}) {
    super();
    this.graph = graph;
    this.width = params.width ? params.width : 300;
    this.height = params.height ? params.height : 300;
    this.length = params.length ? params.length : 300;
    this.color = params.color ? params.color : 'blue';
  }

  create() {
    const graph = this.graph;

    const shape = graph.createFigure({ geometry: 'Shape' });
    shape.figure.moveTo(this.width / -2, this.length / -2);
    shape.figure.lineTo(this.width / -2, this.length / 2);
    shape.figure.lineTo(this.width / 2, this.length / 2);
    shape.figure.lineTo(this.width / 2, this.length / -2);
    shape.figure.lineTo(this.width / -2, this.length / -2);

    const holeWidth = this.width * 0.1;
    const holePath = graph.createFigure({ geometry: 'Path' });
    holePath.figure.moveTo(this.width / -2 + holeWidth, this.length / -2 + holeWidth);
    holePath.figure.lineTo(this.width / -2 + holeWidth, this.length / 2 - holeWidth);
    holePath.figure.lineTo(this.width / 2 - holeWidth, this.length / 2 - holeWidth);
    holePath.figure.lineTo(this.width / 2 - holeWidth, this.length / -2 + holeWidth);
    holePath.figure.lineTo(this.width / -2 + holeWidth, this.length / -2 + holeWidth);
    shape.figure.holes.push(holePath.figure);

    const shapeGeometry = graph.createFigure({
      geometry: 'ExtrudeGeometry',
      material: { emissive: this.color, opacity: 1, side: THREE.DoubleSide },
      attributes: [shape.figure, { depth: holeWidth, bevelEnabled: false }],
    });

    const widthPallet = holeWidth * 0.9;
    const heightPallet = this.height - 1 * holeWidth;

    const cylinderBottomLeft = new Boxes(graph, {
      length: heightPallet,
      width: widthPallet,
      height: this.length,
      color: this.color,
      withParent: false,
    });
    cylinderBottomLeft.setPosition({
      z: -heightPallet / 2,
      x: this.width / 2 - holeWidth / 2,
    });

    const cylinderBottomRight = new Boxes(graph, {
      length: heightPallet,
      width: widthPallet,
      height: this.length,
      color: this.color,
      withParent: false,
    });
    cylinderBottomRight.setPosition({
      z: -heightPallet / 2,
      x: this.width / -2 + holeWidth / 2,
    });

    const cylinderBottomCenter = new Boxes(graph, {
      length: heightPallet,
      width: widthPallet,
      height: this.length,
      color: this.color,
      withParent: false,
    });

    cylinderBottomCenter.setPosition({ z: -heightPallet / 2 });

    const cylinderTopRight = new Boxes(graph, {
      length: holeWidth / 3,
      width: widthPallet,
      height: this.length,
      color: this.color,
      withParent: false,
    });

    cylinderTopRight.setPosition({
      z: holeWidth + widthPallet / 2 - holeWidth / 2,
      x: this.width / -2 + holeWidth,
    });

    const cylinderTopLeft = new Boxes(graph, {
      length: holeWidth / 3,
      width: widthPallet,
      height: this.length,
      color: this.color,
      withParent: false,
    });

    cylinderTopLeft.setPosition({
      z: holeWidth + widthPallet / 2 - holeWidth / 2,
      x: this.width / 2 - holeWidth,
    });

    const cylinderTopCenter = new Boxes(graph, {
      length: holeWidth / 3,
      width: widthPallet,
      height: this.length,
      color: this.color,
      withParent: false,
    });
    cylinderTopCenter.setPosition({ z: holeWidth + widthPallet / 2 - holeWidth / 2 });

    const cylinderTopCenterCenter = new Boxes(graph, {
      length: holeWidth / 3,
      width: this.length - 2 * holeWidth,
      height: widthPallet,
      color: this.color,
      withParent: false,
    });

    cylinderTopCenterCenter.setPosition({ z: holeWidth + widthPallet / 2 - holeWidth / 2 });

    shapeGeometry.add(cylinderBottomRight.render());
    shapeGeometry.add(cylinderBottomLeft.render());
    shapeGeometry.add(cylinderBottomCenter.render());
    shapeGeometry.add(cylinderTopRight.render());
    shapeGeometry.add(cylinderTopLeft.render());
    shapeGeometry.add(cylinderTopCenter.render());
    shapeGeometry.add(cylinderTopCenterCenter.render());

    const figure = graph.createFigure({ geometry: 'Object3D' });
    shapeGeometry.figure.rotation.x = -Math.PI / 2;
    figure.add(shapeGeometry);

    return figure;
  }
}

export default Pallets;
