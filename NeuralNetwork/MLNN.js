class NeuralNetwork {
  constructor(in_nodes, hlayers, hnodes, out_nodes) {
    this.input_nodes = in_nodes;
    this.hidden_layers = hlayers;
    this.hidden_nodes = hnodes;
    this.output_nodes = out_nodes;
    this.weights = [];
    this.weights.push(new Matrix(this.hidden_nodes, this.input_nodes));
    for (let i = 0; i < hlayers - 1; i++) {
      let m = new Matrix(this.hidden_nodes, this.hidden_nodes);
      this.weights.push(m);
    }
    this.weights.push(new Matrix(this.output_nodes, this.hidden_nodes));
    for (let i = 0; i < this.weights.length; i++) {
      this.weights[i].randomize();
    }
    this.biases = [];
    for (let i = 0; i < hlayers; i++) {
      this.biases.push(new Matrix(this.hidden_nodes, 1));
    }
    this.biases.push(new Matrix(this.output_nodes, 1));
    for (let i = 0; i < this.biases.length; i++) {
      this.biases[i].randomize();
    }
    this.setLearningRate();
    this.setActivation();
  }

  clone(obj){
    this.input_nodes   =obj.input_nodes;
    this.hidden_layers =obj.hidden_layers;
    this.hidden_nodes  =obj.hidden_nodes;
    this.output_nodes  =obj.output_nodes;
    this.learning_rate =obj.learning_rate;
    this.weights=[];
    this.biases=[];
    for(let i =0 ; i < obj.weights.length ; i++){
      this.weights.push(Matrix.copy(obj.weights[i]));
    }
    for(let i =0 ; i < obj.biases.length ; i++){
      this.biases.push(Matrix.copy(obj.biases[i]));
    }


    this.setActivation(obj.func) 

  }

  predict(input_list) {
    let inputs = Matrix.fromArray(input_list);
    let Layers = inputs;
    for (let i = 0; i < this.weights.length; i++) {
      Layers = Matrix.multiply(this.weights[i], Layers);
      Layers.add(this.biases[i]);
      Layers.map(this.activation_function.func);
    }
    return Layers.toArray();
  }

  train(input_list, target_array) {
    let inputs = Matrix.fromArray(input_list);
    let Layers = [];
    Layers[0] = inputs;
    for (let i = 1; i < this.hidden_layers + 2; i++) {
      Layers[i] = Matrix.multiply(this.weights[i - 1], Layers[i - 1]);
      Layers[i].add(this.biases[i - 1]);
      Layers[i].map(this.activation_function.func);
    }
    let targets = Matrix.fromArray(target_array);
    let error = Matrix.subtract(targets, Layers[Layers.length - 1]);
    let mse = Matrix.mse(targets, Layers[Layers.length - 1]);
    var prev;
    var bool = 0;
    for (let i = this.hidden_layers + 1; i >= 1; i--) {
      let gradients_array;
      gradients_array = Matrix.map(
        Layers[i],
        this.activation_function.derivative
      );
      gradients_array.multiply(error);
      gradients_array.multiply(this.learning_rate);
      if (i < this.hidden_layers + 1 && i > 0) {
        if (bool == 1) {
          gradients_array.add(prev.multiply(0.9));
        }
        bool = 1;
      }
      prev = gradients_array;
      let hidden_t = Matrix.transpose(Layers[i - 1]);
      let deltas = Matrix.multiply(gradients_array, hidden_t);
      this.weights[i - 1].add(deltas);
      this.biases[i - 1].add(gradients_array);
      if (i > 1)
        error = Matrix.multiply(Matrix.transpose(this.weights[i - 1]), error);
    }
    return mse;
  }


  
  setLearningRate(learning_rate = 0.001) {
    this.learning_rate = learning_rate;
  }

  getLearningRate() {
    return this.learning_rate;
  }

  setActivation(func) {
    this.func=func;
    if (func == "tanh") {
      this.activation_function = tanh;
    } else if (func == "relu") {
      this.activation_function = relu;
    } else if (func == "sigmoid") {
      this.activation_function = sigmoid;
    } else if (func == "lrelu") {
      this.activation_function = lrelu;
    } else if (func == "identity") {
      this.activation_function = identity;
    }
  }

  getActivation() {
    return this.activation_function;
  }
}