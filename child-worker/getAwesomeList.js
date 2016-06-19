var self = getAwesomeList;
module.exports = self;

var lineNormalizerStrategies = require('./lineNormalizerStrategies.js');

function getAwesomeList(content) {
  var lines = content.split('\n');

  var categoryHeadingRegex = /## /;
  var categoryLinkRegex = /\[.*\]\(#.*\)/;

  var currentCategory = '';
  var awesomeList = [];

  lines.forEach(function (line, lineIndex) {
    var awesomeObj = {};

    // Set the Current Catagory
    if (categoryHeadingRegex.test(line)) {
      currentCategory = line.replace(categoryHeadingRegex, '');
      return;
    }

    var obj = lineNormalizerStrategies.getNameAndUrl(line);

    if (obj) {
      awesomeObj.name = obj.name || '';
      awesomeObj.url = obj.url || '';
      awesomeObj.category = currentCategory;
      awesomeList.push(awesomeObj);
    }

  });

  return awesomeList;
}
