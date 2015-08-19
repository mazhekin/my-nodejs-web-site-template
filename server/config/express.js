var express = require('express');
var stylus = require('stylus');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

module.exports = function(app, config) {
    function compile(str, path) {
        return stylus(str).set('filename ', path);
    }

    app.set('views', path.join(config.rootPath, 'server/views'));
    app.set('view engine', 'jade');
    app.use(morgan('dev')); // log every request to the console
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(session({secret: 'my node js template secret'}));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(stylus.middleware({
        src: config.rootPath + '/public',
        compile: compile
    }));
    app.use(express.static(config.rootPath + '/public'));
};