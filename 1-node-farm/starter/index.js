const fs = require('fs');

// Blocking, synchronuous way
// const textInput = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textInput);

// const textOutput = `This is what we know about avocado: ${textInput}.\nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOutput);
// console.log("File written!");

// Non-Blocking, asynchronous way
fs.readFile("./txt/start.txt", "utf-8", (error, data1) => {
  console.log(data1)

  fs.readFile(`./txt/${data1}.txt`, "utf-8", (error, data2) => {
  console.log(data2)

    fs.readFile("./txt/append.txt", "utf-8", (error, data3) => {
      console.log(data3)

      fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, err => {
        console.log("The file has been written!")
      })
    })
  })
})
console.log("Will read file!")