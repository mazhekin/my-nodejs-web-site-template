var mongoose = require('mongoose');
var encrypt = require ('../utilities/encryption');

var userSchema = mongoose.Schema({
    firstName: {type: String, required: '{PATH} is required!' },
    lastName: {type: String, required: '{PATH} is required!' },
    username: {
        type: String,
        required: '{PATH} is required!',
        unique: true
    },
    salt: {type: String, required: '{PATH} is required!' },
    hashed_pwd: {type: String, required: '{PATH} is required!' },
    roles: [String]
});
userSchema.methods = {
    authenticate: function(passwordToMatch) {
        return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    }
};

var User = mongoose.model('User', userSchema);

function createDefaultUsers() {
    User.find({}).exec(function(err, collection) {
        if (collection.length === 0) {
            var salt, hash;
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'mazhekin');
            User.create({firstName: 'Vasiliy', lastName: 'Mazhekin', username: 'mazhekin', salt: salt, hashed_pwd: hash, roles: ['admin']});
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'ivanov');
            User.create({firstName: 'Ivan', lastName: 'Ivanov', username: 'ivanov', salt: salt, hashed_pwd: hash, roles: []});
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'petrov');
            User.create({firstName: 'Petr', lastName: 'Petrov', username: 'petrov', salt: salt, hashed_pwd: hash});
        }
    });
}

exports.createDefaultUsers = createDefaultUsers;