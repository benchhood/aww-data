'use strict';

var self = fetchGithubReadMe;
module.exports = self;

var request = require('request');
var util = require('util');
var Logger = require('./logger.js');
var logger = new Logger(self.name);

var GITHUB_API_BASE_URL = 'https://api.github.com';

function fetchGithubReadMe(owner, repo, callback) {
  if (!owner) {
    logger.error('owner not found %s', owner);
    return;
  }

  if (!repo) {
    logger.error('repo not found %s', repo);
    return;
  }

  var requestUrl = util.format('%s/repos/%s/%s/readme',
    GITHUB_API_BASE_URL, owner, repo);

  logger.debug('constructed requestUrl %s', requestUrl);

  var options = {
    method : 'GET',
    url: requestUrl,
    headers: {
      'User-Agent': 'aww-data'
    }
  };

  request(options, function (error, response, body) {
    if (error || response.statusCode !== 200) {
      logger.error('request failed for url %s with error %s',
        requestUrl, error);
      return callback(error, null)
    }
    var parsedJSON = JSON.parse(body);
    // content is a base64 encoded string.
    // Hence we have to decode it to get the actual content
    var readMeBuffer = new Buffer(parsedJSON.content, 'base64');
    var decodedReadmeContent = readMeBuffer.toString();
    return callback(null, decodedReadmeContent);
  });
}
