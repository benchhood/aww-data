'use strict';

var self = fetchGithubReadMe;
module.exports = self;

var request = require('request');
var util = require('util');
var Logger = require('./logger.js');
var logger = new Logger(self.name);

function fetchGithubReadMe(owner, repo, callback) {

  if (typeof callback !== 'function') {
    logger.error('callback is empty');
    throw new Error('callback is empty');
  }

  if (typeof owner !== 'string') {
    logger.error('owner not found %s', owner);
    return callback('owner param is empty');
  }

  if (typeof repo !== 'string') {
    logger.error('repo not found %s', repo);
    return callback('repo param is empty');
  }

  var requestUrl = util.format('%s/repos/%s/%s/readme',
    process.env.GITHUB_API_BASE_URL, owner, repo);

  var options = {
    method : 'GET',
    url: requestUrl,
    headers: {
      'User-Agent': 'aww-data',
      'Authorization':
        'Basic '.concat(process.env.GITHUB_API_TOKEN)
    }
  };

  var startTime = Date.now();

  request(options, function (error, response, body) {
    var interval = Date.now() - startTime;
    if (error || response.statusCode !== 200) {
      logger.error('request failed for url %s with error %s',
        requestUrl, error || response.statusCode);
      return callback(error || response.statusCode, null);
    }
    logger.debug('GET '+  options.url + ' finished with ' +
      response.statusCode + ' and took ' + interval + 'MS');
    var parsedJSON = JSON.parse(body);
    // content is a base64 encoded string.
    // Hence we have to decode it to get the actual content
    var readMeBuffer = new Buffer(parsedJSON.content, 'base64');
    var decodedReadmeContent = readMeBuffer.toString();
    return callback(null, decodedReadmeContent);
  });
}
