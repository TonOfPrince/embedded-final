const photosController = require('../controllers').photos;
const stocksController = require('../controllers').stocks;
const weatherController = require('../controllers').weather;

module.exports = app => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the Hub API!',
    }));

    // app.post('/api/articles', articlesController.create);
    // app.get('/api/articles', articlesController.list);
    // app.get('/api/articles/:articleid', articlesController.retrieve);
    // app.put('/api/articles/:articleid', articlesController.update);
    // app.delete('/api/articles/:articleid', articlesController.destroy);
};
