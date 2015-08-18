var express = require('express');
var stylus = require('stylus');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');


module.exports = function(app, config) {
    function compile(str, path) {
        return stylus(str).set('filename ', path);
    }

    app.set('views', path.join(config.rootPath, 'server/views'));
    app.set('view engine', 'jade');
    app.use(morgan('dev')); // log every request to the console
    app.use(bodyParser.json());
    app.use(stylus.middleware({
        src: config.rootPath + '/public',
        compile: compile
    }));
    app.use(express.static(config.rootPath + '/public'));
};