const Promise = require("bluebird");
const fs = require("fs");
var path = require('path')
Promise.promisifyAll(fs);
const mongoose = require("mongoose");
const { exec } = require('child_process');


/* Base Git Url */
const url = 'https://github.com/hrsf128-9-hypebeast-bobas/';

let setup = async function() {
    let setupData;
    await fs.readFileAsync( path.join(__dirname, 'proxy-setup.json'), 'utf8')
        .then( data => setupData = JSON.parse(data))
        .catch( err => console.log(err))

    for (let i = 0; i < setupData.length; i++) {
        await purgeData(setupData[i]);
        await mongoose.disconnect();
        await repoSetup(setupData[i]);

    }
    console.log('world')
}


let purgeData = async function({ dbName }) {
    console.log(dbName)
    mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    const db = mongoose.connection;

    try {
        const results = await db.dropDatabase();
        return console.log(results);
    }
    catch (err) {
        return console.log(err);
    }
}

let repoSetup = async function({ packageName, seedScript }) {
    const repoPro = exec(`sh ./scripts/pro-repo.sh ${packageName} ${seedScript}`);
    repoPro.stdout.on('data', (data)=>{
        console.log(data); 
        // do whatever you want here with data
    });
    repoPro.stderr.on('data', (data)=>{
        console.error(data);
    });
}

setup();
