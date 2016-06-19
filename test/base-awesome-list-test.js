// test for each object in awesomeList
var assert = require('assert');
var util = require('util');
var data = require('../data/aww.json');

data.awesomeList.forEach(test);

var uniqueList = [];

function test(awesomeObj, index) {
  var testDescription = util.format('aww-%s %s',
    index + 1, awesomeObj.url);

  var o = awesomeObj;

  var knownUnStandardLists = [
    'https://github.com/MaciejCzyzewski/retter'
  ];

  describe(testDescription, function () {
    coreTest(awesomeObj);

    it('should have isSubList Boolean', function () {
      assert.ok(typeof(o.isSubList) === 'boolean');
    });

    if (knownUnStandardLists.indexOf(awesomeObj.url) !== -1)
      return;

    it('valid data array', function () {
      assert.ok(!!o.data);
      assert.ok(typeof(o.data.length) === 'number', 'length prop absent');
      assert.ok(o.data.length > 0 , 'data.length is 0');
    });
  });
}

function coreTest(o) {
  it('should have valid name', function() {
    assert.ok(!!o.name);
    assert.ok(o.name.length > 0);
  });

  it('should have valid Catagory', function() {
    assert.ok(!!o.category);
    assert.ok(o.category.length > 0);
  });

  it('should have non-empty URL', function() {
    assert.ok(!!o.url);
    assert.ok(o.url.length > 0);
  });

  it('should have URL with protocol', function() {
    if (o.url) {
      assert.ok(
        (o.url.indexOf('http') === 0) ||
        (o.url.indexOf('https') === 0)
      );
    }
  });
}
