var mongoose = require('mongoose');

module.exports = function (config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open',function callback() {
        console.log('my db opened on mongolab');
    });

    var userSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        username: String
    });

    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function(err, collection) {
        if (collection.length === 0) {
            User.create({firstName: 'Vasiliy', lastName: 'Mazhekin', username: 'mazhekin'});
            User.create({firstName: 'Ivan', lastName: 'Ivanov', username: 'ivanov'});
        }
    });
};