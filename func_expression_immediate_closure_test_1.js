const animals = ['dog', 'cat', 'bird'];

for (let i = 0; i < animals.length; i++) {
  (function (i) {
    this.print = function () {
      console.log(`Index #${i}: ${this}`); // "this" should be one element of the "animals" array
    };
    this.print();
  }).call(animals[i], i);

  console.log(`After func expression. Index ${i}`);
}
