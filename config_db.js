var mongoose = require('mongoose');
var config = require('./config.js')
mongoose.connect('mongodb://'+config.mongodAddressPort, function(err) {
    if(err) {throw err;}
    else
        console.log('mongo connected');
});

module.exports = {
    mongoose: mongoose
}