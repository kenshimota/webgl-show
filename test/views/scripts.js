const require = async function(url){
    const response = await import(url);
    const methods = {};
    for(const index in response)
        methods[index] = response[index];
    return methods.default || methods;
};

const Scripts = {
    Stats: {
        type: "text/javascript",
        url: "https://cdn.jsdelivr.net/gh/Kevnz/stats.js/build/stats.min.js",
    },
    THREE: {
        type: "text/javascript", 
        url: "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"
    },
    OrbitControl: {
        type: "module",
        url: "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js"
    }
};

Scripts["App"] = {url: "./app.js", type: "module"};

async function buildScript(){
    const modules = {};
    for(const index in Scripts){
        const data = Scripts[index];
        if( data.type != "module"  ){
            const element = document.createElement("script");
            element.setAttribute("src", data.url);
            element.setAttribute("type", data.type);
            document.body.appendChild(element);
        }
    }

    window.addEventListener("load", async () => {
        for(const index in Scripts){
            const data = Scripts[index];
            if( data.type == "module"  )
                modules[index] = await require(data.url);
        }

        console.log(modules);
        const App = modules.App();
        App.init();
    }, false);
}

buildScript();