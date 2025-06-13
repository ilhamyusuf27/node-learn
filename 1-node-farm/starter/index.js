const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');
const replaceTemplate = require('./modules/replaceTemplate');

////////////////////////////
// FILE SYSTEM MODULE
////////////////////////////

// Blocking, synchronuous way
// const textInput = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textInput);

// const textOutput = `This is what we know about avocado: ${textInput}.\nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOutput);
// console.log("File written!");

// Non-Blocking, asynchronous way
// fs.readFile("./txt/start.txt", "utf-8", (error, data1) => {
//   console.log(data1)

//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (error, data2) => {
//   console.log(data2)

//     fs.readFile("./txt/append.txt", "utf-8", (error, data3) => {
//       console.log(data3)

//       fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, err => {
//         console.log("The file has been written!")
//       })
//     })
//   })
// })
// console.log("Will read file!")

////////////////////////////
// SERVER
////////////////////////////

const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const templateProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const productData = JSON.parse(data);

const slugs = productData.map((product) => slugify(product.productName, { lower: true }));
console.log(slugs);

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);

  //  Overview Page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, {
      'content-type': 'text/html',
    });

    const cardHtml = productData.map((data) => replaceTemplate(templateCard, data)).join('');
    const output = templateOverview.replace(/{%PRODUCT_CARDS%}/g, cardHtml);
    res.end(output);

    // Product Page
  } else if (pathname === '/product' && query.id) {
    res.writeHead(200, {
      'content-type': 'text/html',
    });
    const product = productData[query.id];
    const output = replaceTemplate(templateProduct, product);

    res.end(output);

    // API
  } else if (pathname === '/api') {
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify(productData));

    // NOT FOUND page
  } else {
    res.writeHead(404, {
      'content-type': 'text/html',
      'my-own-header': 'Hello, world',
    });
    res.end('<h1>Page not found</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log(`Server running on port 8000`);
});
