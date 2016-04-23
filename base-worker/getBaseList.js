'use strict';

var self = getBaseList;
module.exports = self;

var Logger = require('../common/logger.js');
var logger = new Logger(self.name);
var request = require('request');
var util = require('util');

function getBaseList(content) {

  if (!content) {
    logger.error('empty content');
    return;
  }

  var lines = content.split('\n');

  var categoryHeadingRegex = /## /;
  var categoryLinkRegex = /\[.*\]\(#.*\)/;
  var awesomeLinkRegex = /\[.*\]\(https:\/\/github.com\/.*\/.*\)/;
  var awesomeSubLinkRegex = /\t- \[.*\]\(https:\/\/github.com\/.*\/.*\)/;

  var currentCategory = '';
  var awesomeList = [];

  var _getNormalizedAwesomeObject = function (line) {
    var name = line.substring(line.indexOf('[') + 1, line.indexOf(']'));
    var remainingLine = line.replace('[' + name + ']', '');
    var url = remainingLine.substring(remainingLine.indexOf('(') + 1,
      remainingLine.indexOf(')'));
    return {
      name : name,
      url : url,
      category: currentCategory
    }
  };

  lines.forEach(function (line, lineIndex) {
    var awesomeObj;

    // Set the Current Catagory
    if (categoryHeadingRegex.test(line)) {
      currentCategory = line.replace(categoryHeadingRegex, '');
      return;
    }

    // Sub awesome list within main awesome lists
    if (awesomeSubLinkRegex.test(line)) {
      awesomeObj = _getNormalizedAwesomeObject(line);
      awesomeObj.isSubList = true;
      awesomeObj.parentName = awesomeList[awesomeList.length - 1].name;
      awesomeList.push(awesomeObj);
      return;
    }

    // Main Awesome list
    if (awesomeLinkRegex.test(line)) {
      awesomeObj = _getNormalizedAwesomeObject(line);
      awesomeObj.isSubList = false;
      awesomeList.push(awesomeObj);
      return;
    }

  });

  return awesomeList;
}
