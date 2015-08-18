
module.exports = function(app) {
    app.get('/partials/*', function(req, res) {
        res.render('../../public/app/' + req.url.substr(9));
    });

    app.get('*', function(req, res) {
        res.render('index');
    });
};