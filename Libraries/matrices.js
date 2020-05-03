class Matrix {
  constructor(t, s) {
    (this.rows = t),
      (this.cols = s),
      (this.data = Array(this.rows)
        .fill()
        .map(() => Array(this.cols).fill(0)));
  }
  copy() {
    let t = new Matrix(this.rows, this.cols);
    for (let s = 0; s < this.rows; s++)
      for (let o = 0; o < this.cols; o++) t.data[s][o] = this.data[s][o];
    return t;
  }

  static copy(x) {
    let t = new Matrix(x.rows, x.cols);
    for (let s = 0; s < x.rows; s++)
      for (let o = 0; o < x.cols; o++) t.data[s][o] = x.data[s][o];
    return t;
  }


  static fromArray(t) {
    return new Matrix(t.length, 1).map((s, o) => t[o]);
  }
  static subtract(t, s) {
    if (t.rows === s.rows && t.cols === s.cols)
      return new Matrix(t.rows, t.cols).map(
        (o, r, a) => t.data[r][a] - s.data[r][a]
      );
    console.log("Columns and Rows of A must match Columns and Rows of B.");
  }
  static mse(t, s) {
    let o = t.toArray(),
      r = s.toArray(),
      a = 0;
    for (let t = 0; t < o.length; t++) a += Math.pow(o[t] - r[t], 2);
    return a;
  }
  toArray() {
    let t = [];
    for (let s = 0; s < this.rows; s++)
      for (let o = 0; o < this.cols; o++) t.push(this.data[s][o]);
    return t;
  }
  randomize() {
    return this.map((t) => 2 * Math.random() - 1);
  }
  add(t) {
    return t instanceof Matrix
      ? this.rows !== t.rows || this.cols !== t.cols
        ? void console.log(
            "Columns and Rows of A must match Columns and Rows of B."
          )
        : this.map((s, o, r) => s + t.data[o][r])
      : this.map((s) => s + t);
  }
  static transpose(t) {
    return new Matrix(t.cols, t.rows).map((s, o, r) => t.data[r][o]);
  }
  static multiply(t, s) {
    if (t.cols === s.rows)
      return new Matrix(t.rows, s.cols).map((o, r, a) => {
        let i = 0;
        for (let o = 0; o < t.cols; o++) i += t.data[r][o] * s.data[o][a];
        return i;
      });
    console.log("Columns of A must match rows of B.");
  }
  multiply(t) {
    return t instanceof Matrix
      ? this.rows !== t.rows || this.cols !== t.cols
        ? void console.log(
            "Columns and Rows of A must match Columns and Rows of B."
          )
        : this.map((s, o, r) => s * t.data[o][r])
      : this.map((s) => s * t);
  }
  map(t) {
    for (let s = 0; s < this.rows; s++)
      for (let o = 0; o < this.cols; o++) {
        let r = this.data[s][o];
        this.data[s][o] = t(r, s, o);
      }
    return this;
  }
  static map(t, s) {
    return new Matrix(t.rows, t.cols).map((o, r, a) => s(t.data[r][a], r, a));
  }
  print() {
    return console.table(this.data), this;
  }
  serialize() {
    return JSON.stringify(this);
  }
  static deserialize(t) {
    "string" == typeof t && (t = JSON.parse(t));
    let s = new Matrix(t.rows, t.cols);
    return (s.data = t.data), s;
  }
}
"undefined" != typeof module && (module.exports = Matrix);
