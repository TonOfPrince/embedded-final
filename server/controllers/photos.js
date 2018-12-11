module.exports = {
    // create(req, res) {
    //     pool.query(`INSERT INTO articles (title, img, topic, intro) VALUES ($1, $2, $3, $4) RETURNING *;`, [req.body.title, req.body.img, req.body.topic, req.body.intro])
    //         .then((article) => res.status(201).send(article.rows[0]))
    //         .catch(error => res.status(400).send(error));
    // },
    // list(req, res) {
    //     pool.query(`SELECT * FROM articles ORDER BY articleid DESC;`)
    //         .then(articles => res.status(201).send(articles.rows))
    //         .catch(error => res.status(400).send(error));
    // },
    // retrieve(req, res) {
    //     pool.query(`SELECT * FROM articles WHERE articleid = ($1);`, [req.params.articleid])
    //         .then(article => res.status(201).send(article.rows[0]))
    //         .catch(error => res.status(400).send(error));
    // },
    // update(req, res) {
    //     pool.query(`UPDATE articles SET img = ($1) WHERE articleid = ($2);`, [req.body.img, req.params.articleid])
    //         .then(article => res.status(201).send(article))
    //         .catch(error => res.status(400).send(error));
    // },
    // destroy(req, res) {
    //     pool.query(`DELETE FROM articles WHERE articleid = ($1);`, [req.params.articleid])
    //         .then(list => res.status(201).send(list))
    //         .catch(error => res.status(400).send(error));
    // },
};
