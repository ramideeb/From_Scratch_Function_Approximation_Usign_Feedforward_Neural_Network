class ActivationFunction {

  constructor(func, dfunc) {
    this.func = func;
    this.dfunc = dfunc;
  }

}

let sigmoid = new ActivationFunction(
  (x) => 1 / (1 + Math.exp(-x)),
  (y) => y * (1 - y)
);

let tanh = new ActivationFunction(
  (x) => Math.tanh(x),
  (y) => 1 - y * y
);

let relu = new ActivationFunction(
  (x) => x>0?x:0,
  (y) => y<=0?0:1
);




class NeuralNetwork {

  constructor(in_nodes,hid_layers ,hid_nodes, out_nodes) {

    this.input_nodes = in_nodes;
    this.hidden_layers = hid_layers;
    this.hidden_nodes = hid_nodes;
    this.output_nodes = out_nodes;

    this.weights=[];
    
    this.weights.push(new Matrix(this.hidden_nodes, this.input_nodes)) ;
    
    for(let i = 0 ; i <hid_layers-1 ;i++){
     let m=new Matrix(this.hidden_nodes, this.hidden_nodes)
     this.weights.push(m)
    }

    this.weights.push(new Matrix(this.output_nodes, this.hidden_nodes));
   
    for (let i = 0; i < this.weights.length; i++) {
       this.weights[i].randomize();
    }

    this.biases=[];

    for (let i = 0; i < hid_layers; i++) {
      this.biases.push(new Matrix(this.hidden_nodes, 1));
    }

    this.biases.push(new Matrix(this.output_nodes, 1));

    for(let i = 0 ; i <this.biases.length;i++){
      this.biases[i].randomize();
    }

    this.setLearningRate();
    this.setActivationFunction();
  }



  predict(input_array) {
    let inputs = Matrix.fromArray(input_array);
    let Layers = inputs;
    
    for(let i = 0 ; i < this.weights.length ; i++ ){

        Layers = Matrix.multiply(this.weights[i], Layers);
        Layers.add(this.biases[i]);
        Layers.map(this.activation_function.func);

    }

    return Layers.toArray();
  }

  train(input_array, target_array) {

    let Structure =this.hidden_layers +2;
    let inputs = Matrix.fromArray(input_array);
    let Layers = [];
    Layers[0] = inputs;

    for (let i = 1; i < Structure; i++)
    {   Layers[i] = Matrix.multiply(this.weights  [i - 1], Layers[i - 1]);
        Layers[i].add(this.biases[i - 1]);
        Layers[i].map(this.activation_function.func); 
    }

    let targets = Matrix.fromArray(target_array);  
    let error = Matrix.subtract(  targets, Layers[Layers.length-1] ) ;
    let mse=Matrix.mse(targets, Layers[Layers.length-1]);

    let prev;
    //BACK PROPAGATION
    for (let i = this.hidden_layers + 2 - 1 ; i >= 1; i--)
    {         
        let gradients = Matrix.map(Layers[i], this.activation_function.dfunc);
        gradients.multiply(error);
        gradients.multiply(this.learning_rate);

        let hidden_t = Matrix.transpose(Layers[i-1]);
        let weight_ho_deltas = Matrix.multiply(gradients, hidden_t);
        if(i< this.hidden_layers + 2 - 1 && i>2  ){
          prev.multiply(0.85);
          this.weights[i - 1].add(weight_ho_deltas.add(prev));
        }
        else{
        this.weights[i - 1].add(weight_ho_deltas );
        }
        prev=weight_ho_deltas;
        this.biases[i - 1].add(gradients);
        if (i > 1) error = Matrix.multiply(Matrix.transpose(this.weights[i - 1]), error);

    }
return mse;
  }


  setLearningRate(learning_rate = 0.001) {
    this.learning_rate = learning_rate;
  }

  getLearningRate() {
    return this.learning_rate ;
  }

  setActivationFunction(func) {
    if(func=="tanh"){
    this.activation_function = tanh;
  }else if(func=="relu"){
    this.activation_function = relu;
  }
  else if (func=="sigmoid"){
    this.activation_function = sigmoid;
  }
  }

}