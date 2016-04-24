module.exports = baseWorker;

//common utils
var Logger = require('../common/logger.js');
var fetchGithubReadMe = require('../common/fetchGithubReadMe.js');
var getOwnerAndRepoFromLink = require('../common/getOwnerAndRepoFromLink.js');
var logger = new Logger(baseWorker.name);

//worker utils
var getBaseList = require('./getBaseList.js');
var childWorker = require('../child-worker/worker.js');


//node modules
var async = require('async');
var fs = require('fs');

function baseWorker(baseAuthor, baseRepoName, finish) {
  fetchGithubReadMe(baseAuthor, baseRepoName,
    function (error, content) {
      if (error) {
        logger.error('error executing fetchGithubReadMe, %s', error);
        return finish(error);
      }
      var awesomeLists = getBaseList(content);
      logger.debug('found %s awesomeLists', awesomeLists.length);
      var result = {
        awesomeList : [],
        count : 0
      };
      async.each(awesomeLists,
        function (awesomeObj, done) {
          var repo = getOwnerAndRepoFromLink(awesomeObj.url);
          if (!repo)
            return done('Not able to get repo details for ' + awesomeObj.url);
          childWorker(repo.owner, repo.repoName,
            function (err, data) {
              if (err)
                return done(err);
              awesomeObj.data = data;
              result.awesomeList.push(awesomeObj);
              return done();
            }
          );
        },
        function (err) {
          if (err) {
            logger.error('An error occured' + err);
            return finish(err);
          }
          result.count = result.awesomeList.length;
          return finish(null, result);
        }
      );
    }
  );
}
