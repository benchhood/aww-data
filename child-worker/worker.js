module.exports = childWorker;

//common utils
var Logger = require('../common/logger.js');
var fetchGithubReadMe = require('../common/fetchGithubReadMe.js');

var logger = new Logger(childWorker.name);

//worker utils
var getAwesomeList = require('./getAwesomeList.js');

function childWorker(repoOwner, repoName, callback) {

  if (typeof callback !== 'function') {
    logger.error('callback is empty');
    throw new Error('callback is empty');
  }

  if (typeof repoOwner !== 'string') {
    logger.error('repoOwner not found %s', repoOwner);
    return callback('repoOwner param is empty');
  }

  if (typeof repoName !== 'string') {
    logger.error('repoName not found %s', repoName);
    return callback('repoName param is empty');
  }

  fetchGithubReadMe(repoOwner, repoName,
    function (error, content) {
      if (error) {
        logger.error('error executing fetchGithubReadMe, %s', error);
        return callback(error);
      }
      var awesomeList = getAwesomeList(content);
      var finalList = [];

      // apply filters
      awesomeList.forEach(
        function(awesomeObj) {
          //reject badges
          if (/\.svg$/.test(awesomeObj.url))
            return;
          if (/^#/.test(awesomeObj.url))
            return;

          // refine category Name
          awesomeObj.category = awesomeObj.category.replace(/#/g, '');

          finalList.push(awesomeObj);
        }
      )

      return callback(null, finalList);
    }
  );
}
