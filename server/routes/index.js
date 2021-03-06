const photosController = require('../controllers').photos;
const stocksController = require('../controllers').stocks;
const weatherController = require('../controllers').weather;

module.exports = app => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the Hub API!',
    }));

    //stocks
    app.get('/api/stocks', stocksController.getStocksInfo);
    app.get('/api/stock/:symbol', stocksController.getStockInfo);
    app.post('/api/stock/:symbol', stocksController.addStock)
    app.delete('/api/stock/:symbol', stocksController.removeStock)
    
    //weather
    app.get('/api/weather', weatherController.getWeather);

    //photos
    app.post('/api/photo', photosController.upload);
    app.get('/api/photos', photosController.getList);
    app.get('/api/photo/:file', photosController.getFile);
    app.delete('/api/photo/:file', photosController.removeFile);
};
