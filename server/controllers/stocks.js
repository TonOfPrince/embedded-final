const https = require('https');
const _ = require('lodash');

let stocks = [];

module.exports = {
    list(req, res) {
        return stocks;
    },
    getStocksInfo(req, res) {
        // https.get(`https://api.iextrading.com/1.0/stock/${req.params.articleid}/quote`, resp => {
        let symbols = _.reduce(stocks, stock => `${stock},`, '');
        https.get(`https://api.iextrading.com/1.0/stock/market/batch?${symbols}&types=quote`, resp => {
            let data = '';

            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                console.log(JSON.parse(data));
                res.status(201).send(data);
            });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
            res.status(400).send(err.message)
        });
    },
    getStockInfo(req, res) {
        https.get(`https://api.iextrading.com/1.0/stock/${req.params.articleid}/quote`, resp => {
            let data = '';

            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                console.log(JSON.parse(data));
                res.status(201).send(data);
            });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
            res.status(400).send(err.message)
        });
    },
    addStock(req, res) {
        stocks.push(req.params.symbol);
        _.uniq(stocks);
        res.status(201).send(stocks);
    },
    removeStock(req, res) {
        _.remove(stocks, req.params.symbol);
        res.status(201).send(stocks);
    },
};
