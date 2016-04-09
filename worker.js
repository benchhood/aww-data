var Logger = require('./common/logger.js');
var logger = new Logger('worker');

var fetchGithubReadMe = require('./common/fetchGithubReadMe.js');
var getAwesomeLists = require('./getAwesomeLists.js');

(function(){

  fetchGithubReadMe('sindresorhus', 'awesome', function (error, content) {\
    if (error) {
      logger.error('error executing fetchGithubReadMe, %s', error);
      return;
    }

    var awesomeLists = getAwesomeLists(content);
    logger.debug(awesomeLists);

  });

})();
