module.exports = main;

var baseWorker = require('./base-worker/worker.js');
var Logger = require('./common/logger.js');
var logger = new Logger(main.name);
var fs = require('fs');

function main() {
  baseWorker(process.env.BASE_LIST_AUTHOR, process.env.BASE_LIST_REPO,
    function(err, result) {
      if (err) {
        logger.error('something went wrong' + err);
        return;
      }
      fs.writeFile(process.env.DATA_PATH, JSON.stringify(result),
        function(err) {
          if (err)
            logger.error('error writing the file to ' + process.env.DATA_PATH);
          logger.debug('you just collected all the awesomeness ! :)');
        }
      );
    }
  );
}
