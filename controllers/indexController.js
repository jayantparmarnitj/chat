'use strict';
var mysql      = require('mysql');
var mongoose = require('mongoose'),
  Task = mongoose.model('tasktable');
  Task1 = mongoose.model('usertable');
exports.task_root = function(req, res) {
  res.json({"hello":"jayant, This is your task"});
};
exports.home_screen = function(req, res) {
  try{
        var arr=[];
      //   Task1.find().distinct('sid', function(error, result) {
      //     // ids is an array of all ObjectIds
      //     return res.status(200).json(result);
      // });
        Task1.find({},function (err, result) {
          if (err) 
            return console.log(err);
            console.log("Home Screen data"+result);
           
               
                    
                // if(arr.length==0)
                //     return  res.status(200).json({success:0,msg:"Conversation does not exist on Home Screeen"});
                //   else
                  return res.status(200).json(result);
            
        });
      }
  catch(e){
    return res.status(500).json({success:0,msg:e.message});
  }
};

exports.get_message = function(req, res) {
  try{
    const message = req.body.message;
    const frid = req.body.rid;
    const fsid = req.body.sid;
    console.log("fridf "+frid);
    console.log("fsidf "+fsid);
var arr=[];
var flag=0;
var lastmessage;
var user;
    var person_data = {
      "message": message,
      "rid": frid,
      "sid": fsid,
      
  };
  
  var person = new Task(person_data);
  console.log("Person "+person);
  
        person.save( function(error, data){
            if(error){
              return console.log(err);
            }
            else{
              console.log("data Inserted");
              //return res.status(200).json(data);
            }
        });

        Task.find({},function (err, result) {

          if (err) 
            return console.log(err);
            console.log(result);
        
                    for(var i = 0; i<result.length; i++ )
                    {
                      if(result[i].sid==fsid)
                        flag=1;
                      if((result[i].sid==fsid && result[i].rid==frid) || (result[i].sid==frid && result[i].rid==fsid))
                      {
                        arr.push(result[i]);
                        lastmessage=result[i].message;
                      }
                    }console.log("flag "+flag);
                    if(flag==0)
                    {
                      var user_data = {
                        "user": fsid,
                        "lastmessage": message,
                       };

                       var user = new Task1(user_data);
                       user.save( function(error, data){
                        if(error){
                          return console.log(error);
                        }
                        else{
                          console.log("data Inserted into user table");
                          //return res.status(200).json(data);
                        }
                      });
                    }
                    else
                    {
                      Task1.find({sid:fsid}).update({ $set: { lastmessage: lastmessage }}).exec(function(err,result){
                        if(err)
                        {
                          console.log(err)
                        }
                        else{
                         console.log("last message added into the user table");
                        }
                      })
                    }
           
         
                // if(arr.length==0)
                //     return  res.status(200).json({success:0,msg:"Conversation does not exist"});
                //   else
                  return res.status(200).json(arr);
            
          
        });

    }
  catch(e){
    return res.status(500).json({success:0,msg:e.message});
  }
};

exports.seen_message = function(req, res) {
  try{

     const frid = req.body.rid;
     const fsid = req.body.sid;
    console.log(fsid);
   Task.find({sid:fsid,rid:frid}).updateMany({ $set: { seen: 1 }}).exec(function(err,result){
     if(err)
     {
       console.log(err)
     }
     else{
      Task1.find({sid:fsid}).update({ $set: { seen: 1 }}).exec(function(err,result){
        if(err)
        {
          console.log(err)
        }
        else{
         console.log(result);
         //return  res.status(200).json({success:0,msg:"Messages have been seen"});
        }
      })
      console.log(result);
      return  res.status(200).json({success:0,msg:"Messages have been seen"});
     }
   })
  
   
    }
  catch(e){
    return res.status(500).json({success:0,msg:e.message});
  }
};
