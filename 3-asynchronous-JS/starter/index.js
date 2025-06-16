const fs = require('fs');
const superagent = require('superagent');

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('Could not write file!');
      resolve('Success');
    });
  });
};

// readFilePro(`${__dirname}/dog.txt`, 'utf-8')
//   .then((data) => {
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((data) => {
//     return writeFilePro(`${__dirname}/dog-img.txt`, data.body.message);
//   })
//   .then(() => {
//     return console.log('Random dog image saved to file');
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

const getDogPic = async () => {
  try {
    const breedName = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${breedName}`);

    const result1 = superagent.get(
      `https://dog.ceo/api/breed/${breedName}/images/random`
    );
    const result2 = superagent.get(
      `https://dog.ceo/api/breed/${breedName}/images/random`
    );
    const result3 = superagent.get(
      `https://dog.ceo/api/breed/${breedName}/images/random`
    );

    const getAlls = await Promise.all([result1, result2, result3]);
    const imgs = getAlls.map((img) => img.body.message);
    console.log(imgs);

    await writeFilePro('dog-img.txt', imgs.join('\n'));
    console.log('Random dog image saved to file!');
  } catch (error) {
    throw error;
  }

  return '2: Ready';
};

(async () => {
  try {
    console.log('1: Will get dog picture!');
    const dogPic = await getDogPic();
    console.log(dogPic);
    console.log('3: Done getting dog images');
  } catch (error) {
    console.log('ERROR 💥');
  }
})();

/*
console.log('1: Will get dog picture!');
getDogPic()
  .then((res) => {
    console.log(res);
    console.log('3: Done getting dog images');
  })
  .catch((err) => {
    console.log('ERROR 💥');
  });
*/
