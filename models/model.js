var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
   // messagesId: Number,
    rid : String,
    sid: String,
    message : String,
    sendTime:{ type: String, default: (new Date()).toISOString() } ,
    seen:{type:Number,default:0}

});

module.exports = mongoose.model('tasktable', schema);