const fs = require('fs');
const _ = require('lodash');
const path = require('path');

let upload = (req, res) => {
    let imageFile = req.files.file;

    imageFile.mv(`photos/${imageFile.name}`, function(err) {
        if (err) {
            return res.status(500).send(err);
        }
        fs.readdir('./photos', (err, files) => {
            _.remove(files, file => file == ".DS_Store");
            res.status(201).send(files);
        })
    });
};

let getList = (req, res) => {
    fs.readdir('./photos', (err, files) => {
        _.remove(files, file => file == ".DS_Store");
        res.status(201).send(files);
    });
}

let getFile  = (req, res) => {
// app.get('*', (req,res) => res.sendFile(path.join(__dirname, '../final', "./index.html")));
    res.sendFile(path.join(__dirname, `../../photos/${req.params.file}`))
}

let removeFile = (req, res) => {
    fs.unlink(`./photos/${req.params.file}`, (err, files) => {
        if (err) {
            return res.status(500).send(err);
        }
        fs.readdir('./photos', (err, files) => {
            _.remove(files, file => file == ".DS_Store");
            res.status(201).send(files);
        });
    });
}

module.exports = {
    upload,
    getList,
    getFile,
    removeFile,
};
