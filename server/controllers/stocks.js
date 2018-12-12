const https = require('https');
const _ = require('lodash');

let stocks = [];
let list = (req, res) =>{
        return stocks;
};
let getStocksInfo = (req, res) =>{
    // https.get(`https://api.iextrading.com/1.0/stock/${req.params.articleid}/quote`, resp => {
    let symbols = _.join(stocks, ",");

    console.log(stocks);
    console.log(symbols);
    if (symbols.length > 0) {
        https.get(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${symbols}&types=quote`, resp => {
            let data = '';

            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                console.log(JSON.parse(data));
                let parsed = JSON.parse(data);
                let retArr = [];
                _.forIn(parsed, (val, key) => {
                    retArr.push({
                        symbol: _.get(val, 'quote.symbol', ''),
                        companyName: _.get(val, 'quote.companyName', ''),
                        latestPrice: _.get(val, 'quote.latestPrice', ''),
                        change: _.get(val, 'quote.change', ''),
                        changePercent: _.get(val, 'quote.changePercent', ''),
                    });
                });

                res.status(201).send(JSON.stringify(retArr));
            });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
            res.status(400).send(err.message)
        });
    } else {
        res.status(201).send(JSON.stringify([]));
    }
};

let getStockInfo = (req, res) => {
    https.get(`https://api.iextrading.com/1.0/stock/${req.params.symbol}/quote`, resp => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            console.log(data);
            res.status(201).send(data);
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
        res.status(400).send(err.message)
    });
};
let addStock = (req, res) =>{
    let symbol = _.find(stocks, stock => stock == req.params.symbol);
    if (symbol) {
        res.status(201).send(JSON.stringify({}));
    } else {
        stocks.push(req.params.symbol);
        console.log('batch');
        getStockInfo(req, res);
    }
};
let removeStock = (req, res) => {
    _.remove(stocks, req.params.symbol);
    res.status(201).send(stocks);
};
module.exports = {
    list,
    getStocksInfo,
    getStockInfo,
    addStock,
    removeStock,
};
