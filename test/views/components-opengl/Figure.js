class Figure {
  
  constructor(){
    this.$data = {};
  }
  
  setPosition(params) {
    if (this.figure) this.figure.setPosition(params);
    else this.positions = params;
  }

  createData(){
    const set = new Set(["$data", "graph", "positions", "figure"]);
    const ref = this;

    for(const index in ref){
      if( !set.has(index) && typeof ref[index] != "function" )
        ref.$data[index] = ref[index];
    }
  }


  // obteniendo los datos de creación de la figura
  get attributes(){
    return this.$data;
  }

  render() {
    if (!this.figure) {
      this.figure = this.create();
      this.createData();
    }
    
    if (this.positions && this.figure) this.figure.setPosition(this.positions);
    return this.figure;
  }
}

export default Figure;
