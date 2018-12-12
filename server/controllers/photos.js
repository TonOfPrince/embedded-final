const fs = require('fs');

let upload = (req, res) => {
    let imageFile = req.files.file;

    imageFile.mv(`photos/${imageFile.name}`, function(err) {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({file: `public/${imageFile.name}.jpg`});
    });
};

module.exports = {
    upload,
};
