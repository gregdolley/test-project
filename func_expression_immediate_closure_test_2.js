const animals = ['dog', 'cat', 'bird'];

for (let i = 0; i < animals.length; i++) {
  (function (i) {
    this.print = function () {
      console.log(`#${i}: ${this}`); // "this" should be one element of the "animals" array
    };

    this.print();
  }).call(animals[i], i);
}

let n = 42;

(function (n) {
  this.print = function () {
    console.log(`n = ${n}`);
  };
  this.print();
}).call(this, n);
