const fs = require('fs');
const process = require('process');
const axios = require('axios');

function cat(path) {
    fs.readFile(path, 'utf-8', function (err, data) {
        if (err) {
            console.log('Error');
            process.exit(1);
        } else {
            console.log(data);
        }
    })
}

cat(process.argv[2]);


async function webCat(url) {
    try {
        let resp = await axios.get(url);
        console.log(resp.data);
    } catch(err) {
        console.error('Error');
        process.exit(1);
    }
}
let path = process.argv[2];

if (path.slice(0, 4) === 'http') {
    webCat(path);
} else {
    cat(path);
}

// ADDED FOR STEP 3

function handleOutput(text, out) {
  if (out) {
    fs.writeFile(out, text, 'utf8', function(err) {
      if (err) {
        console.error(`Error`);
        process.exit(1);
      }
    });
  } else {
    console.log(text);
  }
}

function cat(path, out) {
  fs.readFile(path, 'utf8', function(err, data) {
    if (err) {
      console.error(`Error reading ${path}: ${err}`);
      process.exit(1);
    } else {
      handleOutput(data, out);
    }
  });
}

async function webCat(url, out) {
  try {
    let resp = await axios.get(url);
    handleOutput(resp.data, out);
  } catch (err) {
    console.error(`Error fetching ${url}: ${err}`);
    process.exit(1);
  }
}

let path2;
let out;

if (process.argv[2] === '--out') {
  out = process.argv[3];
  path2 = process.argv[4];
} else {
  path2 = process.argv[2];
}

if (path2.slice(0, 4) === 'http') {
  webCat(path2, out);
} else {
  cat(path2, out);
}