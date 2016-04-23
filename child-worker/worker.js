module.exports = childWorker;

//common utils
var Logger = require('../common/logger.js');
var fetchGithubReadMe = require('../common/fetchGithubReadMe.js');

var logger = new Logger(childWorker.name);

//worker utils
var getAwesomeList = require('./getAwesomeList.js');

function childWorker(repoOwner, repoName, callback) {
  if (!repoOwner)
    return callback('repoOwner not found');
  if (!repoName)
    return callback('repoName not found');

  fetchGithubReadMe(repoOwner, repoName,
    function (error, content) {
      if (error) {
        logger.error('error executing fetchGithubReadMe, %s', error);
        return callback(error);
      }
      var awesomeList = getAwesomeList(content);
      return callback(null,awesomeList);
    }
  );
}
