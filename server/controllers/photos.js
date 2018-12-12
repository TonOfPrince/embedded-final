const fs = require('fs');


let upload = (req, res) => {
    let imageFile = req.files.file;

    imageFile.mv(`photos/${imageFile.name}`, function(err) {
        if (err) {
            return res.status(500).send(err);
        }
        fs.readdir('./photos', (err, files) => {
		  res.status(201).send(files);
		})
    });
};

let getList = (req, res) => {
	fs.readdir('./photos', (err, files) => {
	  res.status(201).send(files);
	})
}

let getFile  = (req, res) => {
	res.sendFile(path.join(__dirname, '../final', `./photos/${req.params.file}`))
}

module.exports = {
    upload,
    getList,
    getFile,
};
