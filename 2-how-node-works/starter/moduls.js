// console.log(arguments);
// console.log(require("module").wrapper);

// module.exports
const Calculator = require("./test-module-1");
const calc1 = new Calculator();
console.log(calc1.add(2, 5));

// exports
const { add, divided } = require("./test-module-2");
console.log(add(2, 5));
console.log(divided(2, 5));

// Caching
require("./test.module-3")();
require("./test.module-3")();
require("./test.module-3")();
