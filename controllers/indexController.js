'use strict';

var mongoose = require('mongoose'),
  Task = mongoose.model('TwilioOtp');
exports.list_card_data = function(req, res) {
  res.json({"hello":"jayant"});
};

exports.verify_otp = function(req, res) {
  try{
    console.log(req.body);
    const otp = req.body.verifyOtp;
    console.log("Otp is: "+otp);
    
    Task.findOne({"Otp":otp},function (err, data) {

      if (err) 
        return console.log(err);
      else if (data)
      {
        if(data.Otp==otp)
            return res.status(200).json({success:1, msg:"Otp Verified Successfully"});
        else
            return res.status(200).json({success:0, msg:"Invalid Otp"});

      }
      else
      return res.status(200).json({success:0, msg:"Invalid Otp"});
    });
    }
  catch(e){
    return res.status(500).json({success:0,msg:e.message});
  }
};

exports.create_charge = function(req, res) {

try{
  console.log(req.body);
 var code = Math.floor((Math.random()*1000000)+1);
  const accountSid = 'AC5cce3ad6245f9d26361fc1430275274a';
  const authToken = 'd569dcea18aa69d7ed19d2dfa35fc6dc';
  const client = require('twilio')(accountSid, authToken);
  const mobile = req.body.cardNum;

  client.messages.create(
    {
      to: `${mobile}`,
      from: '+13015473283',
      body: `Jayant Your OTP is ${code}`,
    },
    (err, message) => {
      if(err)        
        return res.status(200).json({success:0,msg:err.message});
      else
        {
          console.log(message.sid);
          var new_task = new Task({
            mobileNum:mobile,
            Otp:code
           });
           new_task.save(function(err, task) {
             if (err)
               res.send(err);
             res.json(task);
             console.log('MobileNum and Otp saved successfully!');
           });
          return res.status(200).json({success:1, msg:"Otp Sent Successfully"});
          
        }

    }
  );

}
catch(e){
  return res.status(500).json({success:0,msg:e.message});
}

}