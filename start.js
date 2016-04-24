var main = require('./main.js');
var isSetupSuccess = false;

// setup environment variables for local environment
if (!process.env.SHIPPABLE) {
  var setup = require('./setup.js');
  isSetupSuccess = setup();
}
else {
  isSetupSuccess = true;
}

if (isSetupSuccess)
  main();
