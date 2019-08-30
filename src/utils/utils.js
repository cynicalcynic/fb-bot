const fetch = require('node-fetch')
const fs = require('fs-extra');

function random(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}

const downloadFile = (async (url, path) => {
    const res = await fetch(url);
    const fileStream = fs.createWriteStream(path);
    return new Promise((resolve, reject) => {
        res.body.pipe(fileStream);
        res.body.on("error", (err) => {
          reject(err);
        });
        fileStream.on("finish", function() {
          resolve();
        });
      });
});

function arrayRandom(array){
  if(!Array.isArray(array))
    return undefined;
  return array[random(0, array.length)]
}

module.exports = {
    random,
    downloadFile,
    arrayRandom
}