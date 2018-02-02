
'use strict';
module.exports = function(app) {
  var controller = require('../controllers/indexController');

app.all('/driverGps',controller.find_nearest_drivers);
app.all('/allDrivers',controller.find_all_drivers);
//app.all('/driverSignup',controller.drivers_signup);
// app.all('/userLogin',controller.user_login);
// app.all('/driverLogin',controller.driver_login);
//app.post('/verifyOtp',controller.verify_otp);
app.get('/',controller.task_root);

};