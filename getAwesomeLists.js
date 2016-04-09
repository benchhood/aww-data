'use strict';

var self = getAwesomeLists;
module.exports = self;

var Logger = require('./common/logger.js');
var logger = new Logger(self.name);
var request = require('request');
var util = require('util');

function getAwesomeLists (content) {

  var lines = content.split('\n');

  var categoryHeadingRegex = /## /;
  var categoryLinkRegex = /\[.*\]\(#.*\)/;
  var awesomeLinkRegex = /\[.*\]\(https:\/\/github.com\/.*\/.*\)/;
  var awesomeSubLinkRegex = /\t- \[.*\]\(https:\/\/github.com\/.*\/.*\)/;
  var linkContentRegex = /\[.*\]/;
  var linkRegex = /\(.*\)/;

  var currentCategory = '';
  var awesomeList = [];

  var _getNormalizedAwesomeObject = function (line) {
    var name = linkContentRegex.exec(line)[0];
    linkContentRegex.lastIndex = 0 ;
    var link = linkRegex.exec(line)[0];
    linkRegex.lastIndex = 0 ;
    return {
      name : name.replace(/\[|\]/g,''),
      link : link.replace(/\(|\)/g, ''),
      category: currentCategory
    }
  };

  lines.forEach(function (line, lineIndex) {
    var awesomeObj;

    // Set the Current Catagory
    if (categoryHeadingRegex.test(line))
      currentCategory = line.replace(categoryHeadingRegex, '');

    // Sub awesome list within main awesome lists
    if (awesomeSubLinkRegex.test(line)) {
      awesomeObj = _getNormalizedAwesomeObject(line);
      awesomeObj.isSubList = true;
      awesomeObj.parentName = awesomeList[awesomeList.length - 1].name;
      awesomeList.push(awesomeObj);
    }

    // Main Awesome list
    if (awesomeLinkRegex.test(line)) {
      awesomeObj = _getNormalizedAwesomeObject(line);
      awesomeObj.isSubList = false;
      awesomeList.push(awesomeObj);
    }

  });

  return awesomeList;
}
