self.importScripts('lib/MLNN.js');
self.importScripts('lib/matrix.js');

let NN;
let epochs;



var predections = [];
function getPredections() {
    predections=[];
    k = 0;
    for (let i = 0; i < 400; i++) {

        predections.push(

            {
                x: k,
                y: NN.predict([k])[0]
            }


        );
        k += 0.0025;
    };
}


function fit() {
    var error=0;
    for (let i = 0; i < data.length; i++) {
        let x = Math.floor(Math.random() * data.length);
        error += NN.train([data[x].x], [data[x].y]);
    }
    epochs-=1;
    return error/data.length;

}


let preverr=0;
function timedCount() {
    
    let error=fit();

 if(preverr>error){
        NN.setLearningRate(NN.getLearningRate()*1.05);
    }else{
        NN.setLearningRate(NN.getLearningRate()*0.95);
    }


    getPredections();

    let m = {
        d:data,
        p:predections,
        e: error,
        l:NN.getLearningRate()
    };

  postMessage(m);
if(epochs>0)setTimeout("timedCount()",500);

}


self.addEventListener("message", function(e) {
    data=e.data.d;
    NN = new NeuralNetwork(1,e.data.NOHL,e.data.NONPL,1);


    NN.setLearningRate(e.data.LR);
    epochs=e.data.E;
    NN.setActivationFunction(e.data.AF)

    
    timedCount();
}, false);


