const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// port
const port = process.env.PORT || 4000;

// ip
const ip = "127.0.0.1";

app.use(express.static(__dirname));

require('./server/routes')(app);

app.get('*', (req,res) => res.sendFile(path.join(__dirname, '../final', "./index.html")));

// log where we are listening
console.log("Listening on http://" + ip + ":" + port);

app.listen(port);
