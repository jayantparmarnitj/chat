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

var schema1 = new Schema({
    // messagesId: Number,
     user : String,
     lastmessage : String,
     sendTime:{ type: String, default: (new Date()).toISOString() },
     seen:{type:String,default:null}
 
 });

module.exports = mongoose.model('tasktable', schema);
module.exports = mongoose.model('usertable', schema1);