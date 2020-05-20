var Number_Of_Hidden_Layers = 1;
var Number_Of_Nodes_Per_Layer = 1;
var Learning_Rate = 0.01;
var Epochs = 500;
var Activation_Function = "tanh";

var nncloned;

let data = [];

var color = Chart.helpers.color;
var scatterChartData = {
  datasets: [
    {
      label: "training data",
      borderColor: "rgb(220,53,69)",
      backgroundColor: "rgb(220,53,69)",
      data: [],
    },
    {
      label: "testing data",
      borderColor: "rgb(40, 167, 69",
      backgroundColor: "rgb(40, 167, 69",
      data: [],
      type: "line",
    },
  ],
};

window.onload = function () {
  var ctx = document.getElementById("canvas").getContext("2d");
  window.myScatter = Chart.Scatter(ctx, {
    data: scatterChartData,
    options: {
      responsive: true,
    },
  });
};

var w;

function startWorker() {
  document.getElementById("ennnn").innerHTML = 0;
  if (typeof Worker !== "undefined") {
    if (typeof w == "undefined") {
      w = new Worker("JS/Training_Thread.js");  
    }


    w.postMessage({
      d: data,
      NOHL: Number_Of_Hidden_Layers,
      NONPL: Number_Of_Nodes_Per_Layer,
      LR: Learning_Rate,
      E: Epochs,
      AF: Activation_Function,
      ALR: document.getElementById("exampleCheck1").checked,
    });



    w.onmessage = function (event) {
      window.scatterChartData.datasets[0].data = deScaler(event.data.d);
      window.scatterChartData.datasets[1].data = deScaler(event.data.p);
      window.myScatter.update(500);
      document.getElementById("ennnn").innerHTML =
      Number(document.getElementById("ennnn").innerHTML) + 1;
      document.getElementById("MSE").innerHTML = event.data.e;
      //console.log(event.data);
      nncloned = new NeuralNetwork(1, 1, 1, 1);
      nncloned.clone(event.data.n);
    };
  } else {
    document.getElementById("result").innerHTML =
      "Sorry, your browser does not support Web Workers...";
  }
}

function stopWorker() {
  w.terminate();
  
  w = undefined;
}

function datagenerate(x) {

  if (x == "sin") {
    data = [];
    var k = -10;
    for (var i = 0; i < 41; i++) {
      data.push({
        x: k,
        y: Math.sin(0.4* k)+Math.random()/5,
      });
      k += 0.5;
    }

    updataselections(2, 6, 0.01, 4000, "tanh");
    document.getElementById("exampleCheck1").checked = false;
  }

  if (x == "cos") {
    data = [];
    var k = -10;
    for (var i = 0; i < 41; i++) {
      data.push({
        x: k,
        y: Math.cos(0.4*k+1)+Math.random()/5,
      });
      k += 0.5;
    }

    updataselections(3, 50, 0.01, 1000, "tanh");
    document.getElementById("exampleCheck1").checked = false;
  }

  if (x == "x") {
    data = [];
    var k = -10;
    for (var i = 0; i < 21; i++) {
      data.push({
        x: k,
        y: k + Math.random() ,
      });
      k += 1;
    }

    console.log(JSON.stringify(data));

    updataselections(1, 3, 0.1, 20, "relu");
    document.getElementById("exampleCheck1").checked = true;
  }

  if (x == "none") {
    data = [];
  }

  if (x == "x^2") {
    data = [];
    var k = -10;

    for (var i = 0; i < 41; i++) {
      data.push({
        x: k,
        y: Math.pow(k, 2) + 9*Math.random(),
      });
      k += 0.5;
    }

    updataselections(1, 3, 0.1, 5000, "tanh");
    document.getElementById("exampleCheck1").checked = false;
  }

  if (x == "abs") {
    data = [];
    var k = -10;
    for (var i = 0; i < 41; i++) {
      data.push({
        x: k,
        y: Math.abs(k)+Math.random(),
      });
      k += 0.5;
    }
    updataselections(1, 6, 0.1, 4000, "relu");
  }

  if (x == "sqrt") {
    data = [];
    var k = -10;
    for (var i = 0; i < 41; i++) {
      data.push({
        x: k,
        y: k*k*k,
      });
      k += 0.5;
    }
    updataselections(1, 11, 0.05, 4000, "tanh");
  }
  window.scatterChartData.datasets[0].data = data;
  window.myScatter.update(500);
  Scaler();

}

function updataselections(h1, h2, h3, h4, h5) {
  document.getElementById("h11").value = h1;
  document.getElementById("hid_n").innerHTML = h1;
  document.getElementById("h12").value = h2;
  document.getElementById("hid_nn").innerHTML = h2;
  document.getElementById("h13").value = h3;
  document.getElementById("hid_nnlr").innerHTML = h3;
  document.getElementById("h14").value = h4;
  document.getElementById("hid_nnep").innerHTML = h4;
  document.getElementById("h15").value = h5;
  Number_Of_Hidden_Layers = h1;
  Number_Of_Nodes_Per_Layer = h2;
  Learning_Rate = h3;
  Epochs = h4;
  Activation_Function = h5;
}

var xmax = -99999,
    ymax = -99999,
    xmin =  99999,
    ymin =  99999;

function Scaler() {
  for (let i = 0; i < data.length; i++) {
    if (data[i].x < xmin) {
      xmin = data[i].x;
    }
    if (data[i].y < ymin) {
      ymin = data[i].y;
    }
    if (data[i].x > xmax) {
      xmax = data[i].x;
    }
    if (data[i].y > ymax) {
      ymax = data[i].y;
    }
  }

  for (let i = 0; i < data.length; i++) {
    data[i].x = (data[i].x - xmin) / (xmax - xmin);
    data[i].y = (data[i].y - ymin) / (ymax - ymin);
  }

}


function deScaler(data) {

  let deScaled = data;
  for (let i = 0; i < data.length; i++) {
    deScaled[i].x = data[i].x * (xmax - xmin) + xmin;
    deScaled[i].y = data[i].y * (ymax - ymin) + ymin;
  }
  return deScaled;

}


function readpoints(){
 data= JSON.parse(document.getElementById('pointsTA').value );
 window.scatterChartData.datasets[0].data = data;
 window.myScatter.update(500);
 Scaler();
}
