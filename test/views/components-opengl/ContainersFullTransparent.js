import Figure from './Figure.js';
import Pallets from "./Pallets.js";

class ContainersFullTransparent extends Figure {

    /* ---- Construct ---- */
    constructor(graph, params = {}){
        super();
        this.graph = graph;
        this.height = params.height ? params.height : 400;
        this.width = params.width ? params.width : 400;
        this.length = params.length ? params.length : 400;
        this.map = params.map ? params.map : null;
        this.color = params.color ? params.color : "green";
        this.palletCol = params.palletCol || 4;
        this.palletQuantity = params.palletQuantity || 50;
        this.palletMargin = params.palletMargin || 1;
        const containerWall = this.width * 0.05;
        this.containerWall = containerWall;
    }

    /* funcion que se encarga de agregar las paletas que sean necesarias */
    createPallets(){
        const data = { color: this.color, margin: this.palletMargin };
        data.width  = ( (this.width - (this.containerWall * 2)) / this.palletCol) - data.margin * 2;
        data.height = data.width / 2;
        data.length = this.length  / (this.palletQuantity / this.palletCol) - data.margin * 2;
        
        const pallets = [];
        for(let i = 0; i < this.palletQuantity; i++)
            pallets.push( new Pallets(this.graph, data) );

        return { pallets, data };
    }

    // funcion que se encarga de organizar las paletas en el contenedor
    setPositionsPallets(attributes = {}){
        const { pallets, data } = attributes;
        const endX = -this.width / 2 + this.containerWall;
        const endZ = -this.length / 2;
        const height =  -this.height / 2;
        
        let x = endX;
        let z = endZ;

        for(let i = 0; i < pallets.length; i++){
            const pallet = pallets[i];
            const y =  height + data.height;
            
            if(i % this.palletCol == 0){
                x = endX + data.width / 2 + data.margin;
                z = z + data.length + data.margin;
            } else x = x + data.margin + data.width; 
            
            const position = { z, y, x };
            pallet.setPosition(position);
        }
    }

    /* function that create an render component */
    create(){
        const graph = this.graph;
        const figure = graph.createFigure({ geometry: 'Object3D' });

        const response = this.createPallets();
        this.setPositionsPallets(response);

        const pallets = response.pallets;
        for(let i = 0; i < pallets.length; i++){
            const pallet = pallets[i];
            figure.add( pallet.render() );
        }

        return figure;
    }
}

export default ContainersFullTransparent;