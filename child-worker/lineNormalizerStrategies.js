var projectRegexps = [
  {
    format : '[tile](url)',
    regex : /\[(.*)\]\((.*)\)/
  },
  {
    format : '[title]: url',
    regex : /\[(.*)\]: (.*)/
  },
  {
    format : '`title <url>`_',
    regex : /`(.*) <(.*)>`_/
  },
  {
    format : '[[url][title]]',
    regex : /\[\[(.*)\]\[(.*)\]\]/
  },
  {
    format : '.. _title: url',
    regex : /\.\. _(.*): (.*)/
  },
  {
    format : 'url[title^]',
    regex : /(.*)\[(.*)\^\]/
  }
];

regexpMatcher = function (line, regex) {
  var match = line.match(regex) || {};
  if (match) {
    return {
      name : match[1],
      url : match[2]
    };
  }
  return null;
}

module.exports.getNameAndUrl = function (line) {
  for (var i = 0 ; i < projectRegexps.length ; i++) {
    var obj = regexpMatcher(line, projectRegexps[i].regex);
    if (obj) {
      if (obj.name && obj.url) {
        return obj;
      }
    }
  }
  return null;
}
