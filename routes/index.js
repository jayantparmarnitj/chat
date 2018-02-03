
'use strict';
module.exports = function(app) {
  var controller = require('../controllers/indexController');
  app.get('/',controller.task_root);
app.all('/message',controller.get_message);
app.all('/messageSeen',controller.seen_message);
app.all('/homeScreen',controller.home_screen);
//app.all('/allDrivers',controller.find_all_drivers);
//app.all('/driverSignup',controller.drivers_signup);
// app.all('/userLogin',controller.user_login);
// app.all('/driverLogin',controller.driver_login);
//app.post('/verifyOtp',controller.verify_otp);
};