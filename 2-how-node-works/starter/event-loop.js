const fs = require("fs");
const crypto = require("crypto");
process.env.UV_THREADPOOL_SIZE = 4;

const start = Date.now();

fs.readFile("./test-file.txt", () => {
  console.log("I/O finished");
  console.log("------------");

  setTimeout(() => console.log("Timer 1 finished"), 0);
  setTimeout(() => console.log("Timer 2 finished"), 3000);
  setImmediate(() => console.log("Immediate 1 finished"));

  process.nextTick(() => console.log("process.nextTick"));

  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, `Password encrypted`);
  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, `Password encrypted`);
  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, `Password encrypted`);
  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, `Password encrypted`);
});

console.log("Hello from the top level code");
