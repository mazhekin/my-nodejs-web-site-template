var mongoose = require('mongoose');
var userModel = require('../models/User');
var courseModel = require('../models/Course');



module.exports = function (config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log('my db opened on mongolab');
    });

    userModel.createDefaultUsers();
    courseModel.createDefaultCourses();
};