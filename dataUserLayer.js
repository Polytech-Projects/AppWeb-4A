var mongoose = require('./config_db.js');
mongoose = mongoose.mongoose;
var Schema = mongoose.Schema;
var uuidv4 = require('uuid-v4');

var UserSchema = Schema({  
    name: String,
    _id: String,
    password: String
});
// TODO MODIFIER LE TRUC DES DEUX LIGNES DESSOUS
var UserModel = mongoose.model('User', UserSchema);

module.exports = {

    findUserById: function(id, cb){
        UserModel.findById(id,{ password: 0 },function(err, user){
            if(err){
                throw err;
            }else{
                if(user!=null){
                    cb(user);
                }
            }
        });
    },

    updateUser: function(user, cb){
        UserModel.findByIdAndUpdate(user.id, user, function(err, user){
            if(err){
                throw err;
            }else{
                cb();
            }
        });
    },

    addUser: function(user, cb){
        var userToSave = new UserModel({
            _id:user.email,
            name:user.name,
            password:user.password
        });
        userToSave.save(function(err){
            if(err){
                throw err;
            }else{
                cb();
            }
        });
    },

    deleteUserById: function(id, cb){
        UserModel.findByIdAndRemove(id, function(err, todo){
            if (err){
                throw err;
            }else{
                cb();
            }
        });
    },

    getUserSet: function(cb) {
        UserModel.find({}, function (err, users) {
            if (err) throw err;
            else cb(users);
        });
    },

    findUserByIdWithPwd: function(id, cb){
        UserModel.findById(id,function(err, user){
            if(err){
                throw err;
            }else{
                cb(user);
            }
        });
    }
};