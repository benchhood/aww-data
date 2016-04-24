var setup = require('./setup.js');
var main = require('./main.js');
var isSetupSuccess = false;

console.log('SHIPPABLE_JOB_NUMBER' + process.env.SHIPPABLE_JOB_NUMBER);

console.log(JSON.stringify(process.env));

// setup environment variables for local environment
if (!process.env.SHIPPABLE_JOB_NUMBER) {
  isSetupSuccess = setup();
}
else {
  isSetupSuccess = true;
}

if (isSetupSuccess)
  main();
