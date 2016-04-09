module.exports = logger;

var util = require('util');
var chalk = require('chalk');

function logger(caller) {
  this.caller = caller;
  // Implement some other logger if needed.
}

logger.prototype.error = function () {
  var argsArray = Array.prototype.slice.call(arguments);
  var message = util.format.apply({}, argsArray);
  message = util.format('%s : %s', chalk.red(this.caller), message);
  console.error(message);
};

logger.prototype.debug = function () {
  var argsArray = Array.prototype.slice.call(arguments);
  var message = util.format.apply({}, argsArray);
  message = util.format('%s : %s', chalk.cyan(this.caller), message);
  console.log(message);
};
