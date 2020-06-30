const Promise = require("bluebird");
const fs = require("fs");
var path = require('path')
Promise.promisifyAll(fs);
const { exec } = require('child_process');

/* Base Git Url */
const url = 'https://github.com/hrsf128-9-hypebeast-bobas/';

let launchThem = async function() {
    let setupData;
    await fs.readFileAsync( path.join(__dirname, 'proxy-setup.json'), 'utf8')
        .then( data => setupData = JSON.parse(data))
        .catch( err => console.log(err))

    for (let i = 0; i < setupData.length; i++) {
        launch(setupData[i])

    }
}

let launch = async function({ url }) {
    const repoPro = exec(`start ${url}`);
    repoPro.stdout.on('data', (data)=>{
        console.log(data); 
        // do whatever you want here with data
    });
    repoPro.stderr.on('data', (data)=>{
        console.error(data);
    });
}

launchThem();