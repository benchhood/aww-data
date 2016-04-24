var assert = require('assert');

var data;
before(function () {
  data = require('../data/aww.json');
});

describe('data/aww.json', function () {

  it('should have awesomeList array', function () {
    assert.ok(!!data.awesomeList);
    assert.ok(!!data.awesomeList.length);
  });

  it('should have count object', function () {
    assert.ok(!!data.count);
  });

  it('should have count equal to awesomeList.length', function () {
    assert.deepEqual(data.count, data.awesomeList.length)
  });
});
