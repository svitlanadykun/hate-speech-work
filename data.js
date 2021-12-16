const csvtojson = require("csvtojson");
const fs = require("fs");
const csv = './labeled.csv';
let badArr = [];
let goodArr = [];

getjson = async (path) => {
    const json = await csvtojson().fromFile(path);
    return json;
}

addToClassifier = async (path) => {
    const textArr = await getjson(path);


    for (const el of textArr) {
        const {
            comment,
            toxic
        } = el;
        if (toxic == '1.0') {
            badArr.push(comment)
        }
        if (toxic == '0.0') {
            goodArr.push(comment)
        }

    }
    let badJson = JSON.stringify(badArr);
    let goodJson = JSON.stringify(goodArr);

    fs.writeFile("bad.json", badJson, function(err, result) {
        if (err) console.log('error', err);
    })

    fs.writeFile("good.json", goodJson, function(err, result) {
        if (err) console.log('error', err);
    })
}

addToClassifier(csv).then((res) => {

})


