'use strict';
var mysql      = require('mysql');
// var dname,long,lat;
// var arr=[];
//const Resbody={};
// var mongoose = require('mongoose'),
//   Task = mongoose.model('driver_gps');
exports.list_card_data = function(req, res) {
  res.json({"hello":"jayant"});
};

exports.get_message = function(req, res) {
  try{
    const driverName = JSON.stringify(req.body.driverName);
    const Flongitude = JSON.stringify(req.body.longitude);
    const Flatitude = JSON.stringify(req.body.latitude);
    console.log("Flongitude: "+Flongitude);
    console.log("Flatitude: "+Flatitude);
  var db_config = {
    host     : process.env.MYSQL_HOST,
    user     : process.env.MYSQL_USER,
    password : process.env.MYSQL_PASSWORD,
    database : process.env.MYSQL_DATABASE
};
  
  var connection;
  connection = mysql.createConnection(db_config); 
  function handleDisconnect() {
      console.log('1. connecting to db:');
     
     
  
      connection.connect(function(err) {             
          if (err) {                                    
              console.log('2. error when connecting to db:', err);
           // throw err;
           console.log("createdgfd");
              setTimeout(handleDisconnect, 5000); 
          }
          else{console.log("Ininserted");
           // var sql = "CREATE TABLE uber_Drivers (driverName VARCHAR(255), longitude DOUBLE(40,5), latitude DOUBLE(40,5))";
           //var sql = "INSERT INTO uberDrivers (name, address) VALUES ('Company Inc', 'Highway 37')";
           //var sql = "select * from uber_drivers";
           var sql = "INSERT INTO tasktable (driverName, longitude, latitude) VALUES ("+driverName+","+Flongitude+","+Flatitude+")";
            connection.query(sql, function (err, result) 
             {
                    if (err) 
                         throw err;
                   
                    console.log("inserted");
                   return res.status(200).json(result);

             });
          }

      });                                   

      connection.on('error', function(err) {
          console.log('3. db error', err);
          if (err.code === 'PROTOCOL_CONNECTION_LOST') {
           
           
              handleDisconnect();                      	
          } else {                                      	
              throw err;                                  
          }
      });
  }
  
  handleDisconnect();
    }
  catch(e){
    return res.status(500).json({success:0,msg:e.message});
  }
};

exports.find_all_drivers = function(req, res) {
  try{
    var dname,long,lat;
    var arr=[];
    const driverName = JSON.stringify(req.body.driverName);
    const Flongitude = JSON.stringify(req.body.longitude);
    const Flatitude = JSON.stringify(req.body.latitude);
    console.log("Flongitude: "+Flongitude);
    console.log("Flatitude: "+Flatitude);
  var db_config = {
    host     : process.env.MYSQL_HOST,
    user     : process.env.MYSQL_USER,
    password : process.env.MYSQL_PASSWORD,
    database : process.env.MYSQL_DATABASE
};
  
  var connection;
  connection = mysql.createConnection(db_config); 
  function handleDisconnect() {
      console.log('1. connecting to db:');
     
     
  
      connection.connect(function(err) {              
          if (err) {                                    
              console.log('2. error when connecting to db:', err);
           // throw err;

              setTimeout(handleDisconnect, 5000); 
          }
          else{



            var min = 100000000;
            var radius=10;
            var sql = "select * from uber_Drivers"
            connection.query(sql, function (err, result) 
             {
                    if (err) 
                         throw err;
                     if(result.length){
                    
                   return res.status(200).json(result);
                 
                  }
               
               
             });
          }

      });                                   

      connection.on('error', function(err) {
          console.log('3. db error', err);
          if (err.code === 'PROTOCOL_CONNECTION_LOST') {
         
           
              handleDisconnect();                      	
          } else {                                      	
              throw err;                                  
          }
      });
  }
  
  handleDisconnect();
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

  //   var db_config = {
  //     host     : 'us-cdbr-iron-east-05.cleardb.net',
  //     user     : 'b37b1bb4aa4cc9',
  //     password : '2a1767d4',
  //     database : 'heroku_ed303c50642e20d'
  // };

  var db_config = {
    host     : process.env.MYSQL_HOST,
    user     : process.env.MYSQL_USER,
    password : process.env.MYSQL_PASSWORD,
    database : process.env.MYSQL_DATABASE
};
  
  var connection;
  connection = mysql.createConnection(db_config); 
  function handleDisconnect() {
      console.log('1. connecting to db:');
     
     
  
      connection.connect(function(err) {              
          if (err) {                                    
              console.log('2. error when connecting to db:', err);
           // throw err;

              setTimeout(handleDisconnect, 5000); 
          }
          else{



            var min = 1;
            var radius=0.007608997108693453;
            var sql = "select * from uber_Drivers"
            connection.query(sql, function (err, result) 
             {
                    if (err) 
                         throw err;
                        
                     if(result.length){
                    for(var i = 0; i<result.length; i++ ){
                      var d = findD(Flatitude,Flongitude,result[i].latitude,result[i].longitude);
                      if(d<min)
                      {
                        arr.push(result[i]);
                      }
                    }

                   console.log("nearest drivers "+ arr.length);
                 if(arr.length==0)
                     return res.status(200).json({success:1, msg:"Service available only in chandigarh"});
                   else
                   return res.status(200).json(arr);
                  }
                
               
               
             });
          }

      });                                   

      connection.on('error', function(err) {
          console.log('3. db error', err);
          if (err.code === 'PROTOCOL_CONNECTION_LOST') {
         
           
              handleDisconnect();                      	
          } else {                                      	
              throw err;                                  
          }
      });
  }
  
  handleDisconnect();

    }
  catch(e){
    return res.status(500).json({success:0,msg:e.message});
  }
};
















// exports.create_charge = function(req, res) {

// try{
//   console.log(req.body);
//  var code = Math.floor((Math.random()*1000000)+1);
//   const accountSid = 'AC5cce3ad6245f9d26361fc1430275274a';
//   const authToken = 'd569dcea18aa69d7ed19d2dfa35fc6dc';
//   const client = require('twilio')(accountSid, authToken);
//   const mobile = req.body.cardNum;

//   client.messages.create(
//     {
//       to: `${mobile}`,
//       from: '+13015473283',
//       body: `Jayant Your OTP is ${code}`,
//     },
//     (err, message) => {
//       if(err)        
//         return res.status(200).json({success:0,msg:err.message});
//       else
//         {
//           console.log(message.sid);
//           var new_task = new Task({
//             mobileNum:mobile,
//             Otp:code
//            });
//            new_task.save(function(err, task) {
//              if (err)
//                res.send(err);
//             // res.json(task);
//              console.log('MobileNum and Otp saved successfully!');
//            });
//           return res.status(200).json({success:1, msg:"Otp Sent Successfully"});
          
//         }

//     }
//   );

// }
// catch(e){
//   return res.status(500).json({success:0,msg:e.message});
// }

// }















   // con.connect(function(err) {
    //   if (err) throw err;
    //   console.log("Connected!");
    //   //var sql = "CREATE TABLE driver_gps (driverName VARCHAR(255), longitude VARCHAR(255), latitude VARCHAR(255))";
    //   //var sql = "drop table driver_gps";
    //   var sql = "select * from driver_gps";
    //  //var sql = "INSERT INTO driver_gps (driverName, longitude, latitude) VALUES ("+driverName+", "+Flongitude+", "+Flatitude+")";
    //   con.query(sql, function (err, result) {
    //     if (err) throw err;
    //     console.log("inserted  "+result);
    //     res.send([result]);
    //   });
    // });






      // Task.findOne("Math.sqrt(Math.pow((Flongitude-longitude), 2) + Math.pow((Flatitude-latitude), 2))>="+ min +": min=Math.sqrt( Math.pow((Flongitude-longitude), 2) + Math.pow((Flatitude-latitude), 2)) ? "+min+"",function (err, data) {

    //   if (err) 
    //     return console.log(err);
    //   else if (data)
    //   {
    //       console.log("database data:"+data);
    //       const dbLongitude=data.longitude;
    //       const dbLatitude=data.latitude;
    //       const name = data.driverName;
    //       const Resbody = {
    //         "driverName":name,
    //         "longitude":dbLongitude,
    //         "latitude":dbLatitude
    //       }
    //     return res.send({Resbody});
    //       //return res.status(200).json({success:1, msg:`Success: nearest driver: ${name}, Longitude: ${dbLongitude} and Latitude: ${dbLatitude}`});
    //       //return res.status(200).json({"driverName":name,"longitude":dbLongitude,"latitude":dbLatitude});
    //   }
    //   else
    //   return res.status(200).json({success:1, msg:"Service available only in chandigarh"});
      
    // });