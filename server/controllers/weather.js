const https = require('https');
const _ = require('lodash');

let city = "";

let getWeather = (req, res) => {
    city = req.query.city || city;
    console.log(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=06a202740b673007edb9c05b90369560`);
    https.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=06a202740b673007edb9c05b90369560&units=imperial`, resp => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            console.log(data);
            let parsed = JSON.parse(data);
            if (parsed.cod == 404) {
                res.status(400).send({err: parsed.message});
            } else {
                res.status(201).send({
                    temp: _.toInteger(_.get(parsed, "main.temp", "")),
                    tempMax: _.toInteger(_.get(parsed, "main.temp_max", "")),
                    tempMin: _.toInteger(_.get(parsed, "main.temp_min", "")),
                    description: _.get(parsed, "weather[0].description", ""),
                    city: _.get(parsed, "name", ""),
                });
            }
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
        res.status(400).send(err.message)
    });
};

module.exports = {
    getWeather,
};
