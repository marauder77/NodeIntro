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


//AXIOS ERROR,, TRIED COPYING THE SOLUTION CODE AS WELL, AND THE SAME ISSUE 
//REALIZED IT WAS THE PACKAGE I DIDN'T INSTALL -_- 


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

