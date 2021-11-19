import Figure from './Figure.js';

class Boxes extends Figure {
  constructor(graph = null, params = {}) {
    super();
    this.graph = graph;
    this.width = params.width ? params.width : 300;
    this.height = params.height ? params.height : 300;
    this.length = params.length ? params.length : 300;
    this.color = params.color ? params.color : 'blue';
    this.withParent = params.withParent == undefined ? true : params.withParent;
    this.map = params.map;
  }

  create() {
    const graph = this.graph;
    const material = {
      type: (this.map && 'basic') || 'phong',
      map: this.map,
      emissive: this.color,
      transparent: true,
      opacity: 0.9,
    };
    
    for(const index in material){
      if(material[index] == undefined)
        delete material[index];
    }

    const cube = graph.createFigure({
      geometry: 'BoxGeometry',
      attributes: [this.width, this.height, this.length],
      material: material
    });

    let cubeParent = null;

    if (this.withParent) {
      const attributes = {
        type: (this.map && 'basic') || 'phong',
        emissive: 0x000000,
        transparent: true,
        opacity: 0.6,
        map: this.map,
        wireframe: true,
      };

      for(const index in attributes){
        if(attributes[index] == undefined)
          delete attributes[index];
      }

      cubeParent = graph.createFigure({
        geometry: 'BoxGeometry',
        attributes: [this.width, this.height, this.length],
        material: attributes,
      });
      cubeParent.add(cube);
    } else cubeParent = cube;

    return cubeParent;
  }
}

export default Boxes;
