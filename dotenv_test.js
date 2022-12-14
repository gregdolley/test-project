require("dotenv").config();

console.log("process.env.DEBUG =", process.env.DEBUG);
console.log("process.env.NAME =", process.env.NAME);

let debug =
  typeof process.env.DEBUG === "string"
    ? process.env.DEBUG.trim().toLowerCase() === "true" ||
      process.env.DEBUG.trim() === "1"
      ? true
      : false
    : Boolean(process.env.DEBUG);

if (debug === true) console.debug("hello", process.env.NAME);

// require("dotenv").config({ debug: true });

// console.log("hello", process.env.NAME);
