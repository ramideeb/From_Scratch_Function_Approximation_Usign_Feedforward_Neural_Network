class Activation {
  constructor(func, derivative) {
    this.func = func;
    this.derivative = derivative;
  }
}

var sigmoid = new Activation(
  (x) => 1 / (1 + Math.exp(-x)),
  (y) => y * (1 - y)
);

var tanh = new Activation(
  (x) => Math.tanh(x),
  (y) => 1 - y * y
);

var relu = new Activation(
  (x) => Math.max(0,x),
  (y) => (y > 0 ? 1 : 0)
);

var lrelu = new Activation(
  (x) => (x >= 0 ? x : 0.01 * x),
  (y) => (y >= 0 ? 1 : 0.01)
);

var identity = new Activation(
  (x) => x,
  (y) => 1
);
