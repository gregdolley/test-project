require("dotenv").config();

console.log("process.env.DEBUG =", process.env.DEBUG);
console.log("process.env.NAME =", process.env.NAME);

let debug = isDebugEnv();

if (debug === true) console.debug("DEBUG environment set.");
else console.log("DEBUG environment not set.");

console.log("process.env.NODE_ENV =", process.env.NODE_ENV);

// Returns true if the DEBUG environment variable is set to either string values:
//
// "true" (not case-sensitive, "TRUE" is equivalent)
// "1"
//
// OR, the process.env.DEBUG property is set to one of the following:
//
// true (the primitive type, not the string "true")
// 1
// or any value the Boolean() function would eval as "truthy".
//
// Returns false in all other cases.
function isDebugEnv() {
  return typeof process.env.DEBUG === 'string' ? (process.env.DEBUG.trim().toLowerCase() === 'true' || process.env.DEBUG.trim() === '1' ? true : false) : Boolean(process.env.DEBUG);
}