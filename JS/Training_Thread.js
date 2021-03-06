self.importScripts("../NeuralNetwork/MLNN.js");
self.importScripts("../NeuralNetwork/Activation_Functions.js");
self.importScripts("../Libraries/matrices.js");

var NN=null;
let epochs;
let ALR;

var predections = [];

function getPredections() {
  predections = [];
  k = 0;
  for (let i = 0; i < 400; i++) {
    predections.push({
      x: k,
      y: NN.predict([k])[0],
    });
    k += 0.0025;
  }
}

function fit() {
  var error = 0;
  for (let i = 0; i < data.length; i++) {
    let x = Math.floor( Math.random() * data.length );
    error += NN.train([data[x].x], [data[x].y]);
  }
  epochs -= 1;
  return error / data.length;
}



let preverr = 0;
let i = 0;
function timedCount() {
  let error = fit();
  i=i+1;
  if (ALR && i%100==0) {
    if (preverr > error) {
      NN.setLearningRate(NN.getLearningRate() * 1.1);
    } else {
      NN.setLearningRate(NN.getLearningRate() * 0.75);
    }

  }

  getPredections();

  let m = {
    d: data,
    p: predections,
    e: error,
    l: NN.getLearningRate(),
    n:JSON.parse(JSON.stringify(NN)),
    sp:null
  };

  postMessage(m);

  if (epochs > 0 ) setTimeout("timedCount()", 500);
}




self.addEventListener(
  "message",
  function (e) {

      if(NN==null)
      { 
      NN = new NeuralNetwork(1, e.data.NOHL, e.data.NONPL, 1);
      data = e.data.d;
      ALR = e.data.ALR;
      NN.setLearningRate(e.data.LR);
      NN.setActivation(e.data.AF);
      }
      
      epochs = e.data.E;

    timedCount();

  },
  false
);
