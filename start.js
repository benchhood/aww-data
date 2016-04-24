var setup = require('./setup.js');
var main = require('./main.js');
var isSetupSuccess = false;

// setup environment variables for local environment
if (!process.env.SHIPPABLE_JOB_NUMBER) {
  isSetupSuccess = setup();
}
else {
  isSetupSuccess = true;
}

if (isSetupSuccess)
  main();
