var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    driverName:  String,
     longitude:  Number,
     latitude: Number
});

module.exports = mongoose.model('taskTable', schema);