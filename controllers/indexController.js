'use strict';
var mysql      = require('mysql');
var mongoose = require('mongoose'),
  Task = mongoose.model('taskTable');
exports.task_root = function(req, res) {
  res.json({"hello":"jayant, This is your task"});
};
exports.find_all_drivers = function(req, res) {
  try{
    var dname,long,lat;
    var arr=[];
    const driverName = JSON.stringify(req.body.driverName);
    const Flongitude = JSON.stringify(req.body.longitude);
    const Flatitude = JSON.stringify(req.body.latitude);


   Task.find({},function (err, data) {

      if (err) 
        return console.log(err);
      else if (data)
      {
          return res.status(200).json(data);
      }
      
    });


    }
  catch(e){
    return res.status(500).json({success:0,msg:e.message});
  }
};


function findD(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  return d;
}
function deg2rad(deg) {
  return deg * (Math.PI/180)
}
exports.find_nearest_drivers = function(req, res) {
  try{
    var dname,long,lat;
var arr=[];
    const driverName = JSON.stringify(req.body.driverName);
    const Flongitude = JSON.stringify(req.body.longitude);
    const Flatitude = JSON.stringify(req.body.latitude);
    console.log("Flongitude: "+Flongitude);
    console.log("Flatitude: "+Flatitude);

            var min = 5;
        
            Task.find({},function (err, result) {

              if (err) 
                return console.log(err);
                if(result.length)
                {
                  for(var radius=1;radius<=10;radius++)
                  {
                        for(var i = 0; i<result.length; i++ )
                        {
                          var d = findD(Flatitude,Flongitude,result[i].latitude,result[i].longitude);
                          if(d<radius)
                          {
                            arr.push(result[i]);
                          }
                        }
                      console.log("nearest drivers "+ arr.length);
                      if(arr.length)
                        break;
                  }
                    if(arr.length==0)
                        return  res.status(200).json({success:0,msg:"Service not available"});
                      else
                      return res.status(200).json(arr);
                }
              
            });
    }
  catch(e){
    return res.status(500).json({success:0,msg:e.message});
  }
};
