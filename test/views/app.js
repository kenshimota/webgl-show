import WebGl from "../../cdn/index.js";
import WarehouseWithPallets from "./components-opengl/WarehouseWithPallets.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js";

const App = () => ({
    data: { graph: null, stats: null },
    $refs: { "node-graph": document.createElement("div") },

    init: function(){
      document.body.appendChild(this.$refs["node-graph"]);
      this.mounted();
    },
    
    mounted: async function(){
      const element = this.$refs["node-graph"];
      element.style.width = "100%";
      element.style.height = "400px";

      const graph = await WebGl({
        element,
        width: element.offsetWidth,
        height: element.offsetHeight,
        logs: true, 
        color: "white"
      })

      const resource = new WarehouseWithPallets(graph);
      graph.addFigure( resource.render() );
      const camera = graph.camera;
      camera.position.z = 500;
      camera.position.y = 500;
      camera.position.x = 0;
      camera.lookAt( graph._scene.position );
      
      const controls = new OrbitControls(camera, element);
      controls.update();
    },
});

export default App;