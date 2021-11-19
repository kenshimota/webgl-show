import Flat from "./Flat.js";
import Figure from "./Figure.js";
import ContainersFullTransparent from "./ContainersFullTransparent.js";
import containersData from "./containers-warehouse.js";

class WarehouseWidthPallets extends Figure {

    /* --- Constructor ---  */
    constructor(graph){
        super();
        this.widthPixelMax = window.outerWidth;
        this.LengthPixelMax = window.outerWidth;
        this.dividerWidth  = 42;
        this.unit = this.widthPixelMax / this.dividerWidth;
        this.length = this.unit * 32;
        this.width = this.unit * this.dividerWidth;
        this.graph = graph;
    }

    /* --- Funcion que se encarga de crear los contenedores dados --- */
    createContainers(){
        const containers = {};
        const graph = this.graph; 
        for(const index in containersData){
            const data = containersData[index];
            containers[index] = new ContainersFullTransparent(graph, {
                color: data.color,
                width: data.col * this.unit,
                length: data.quantity / data.col * this.unit,
                palletCol: data.col,
                palletQuantity: data.quantity,
            });

            containers[index].setPosition( this.serCalculatePosition(data.coords) );
        }

        return containers;
    }

    serCalculatePosition(coords = []){
        const startWidth = this.width / -2;
        const startLength = this.length / -2;
        const result = { y: 195, x: 0, z: 0 };
        const unit = this.unit;
        result.z = unit * coords[0] + startLength;
        result.x = unit * coords[1] + startWidth;
        return result;
    }


    /* --- Renderizacion del componente --- */
    render(){
        const graph = this.graph;
        const figure = graph.createFigure({ geometry: 'Object3D' });
        const flat = new Flat(graph, {  width: this.width, length: this.length  });
        figure.add(flat.render());

        const containers = this.createContainers();
        for(const index in containers){
            const container = containers[index];
            figure.add( container.render() );
        }

        return figure;
    }
}

export default WarehouseWidthPallets;