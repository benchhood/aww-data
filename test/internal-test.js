var assert = require('assert');

var errorCheckingCallback =  function(err) {
  if (err)
    this();
};

before(function () {
  // setup environment variables for local environment only
  if (!process.env.SHIPPABLE_JOB_NUMBER) {
    var setup = require('../setup.js');
    var isSetupSuccess = setup();
    assert.ok(isSetupSuccess);
  }
});

describe('aww-data library tests', function () {
  this.timeout(15000);

  var getOwnerAndRepoFromLink;
  before(function () {
    getOwnerAndRepoFromLink = require('../common/getOwnerAndRepoFromLink.js');
  });

  describe('common/getOwnerAndRepoFromLink.js', function () {

    it('should handle empty object', function () {
      getOwnerAndRepoFromLink();
    });

    it('should return expected objects for valid link', function() {
      var validLink = 'https://github.com/scriptnull/aww-data';
      var result = getOwnerAndRepoFromLink(validLink);
      assert.ok(!!result.owner);
      assert.ok(!!result.repoName);
      assert.ok(!!result.link);
    });

    it('should return correct values for valid link', function () {
      var validLink = 'https://github.com/scriptnull/aww-data';
      var result = getOwnerAndRepoFromLink(validLink);
      assert.deepEqual(result.owner, 'scriptnull');
      assert.deepEqual(result.repoName, 'aww-data');
      assert.deepEqual(result.link, validLink);
    });

    it('should return null for invalid link', function () {
      var invalidLink = 'http://github.com/scriptnull/aww-data';
      var result = getOwnerAndRepoFromLink(invalidLink);
      assert.deepEqual(result, null);
    });

  });

  var fetchGithubReadMe;
  before(function () {
    fetchGithubReadMe = require('../common/fetchGithubReadMe.js');
  });

  describe('common/fetchGithubReadMe', function () {

    it('should handle 3 empty params', function (done) {
      try {
        fetchGithubReadMe();
      }
      catch (err) {
        if (err.message)
          done();
        else
          done(true);
      }
    });

    it('should handle 2 empty params', function (done) {
      var doneBindedCallback = errorCheckingCallback.bind(done);
      fetchGithubReadMe(null, null, doneBindedCallback);
    });

    it('should handle empty owner param', function (done) {
      var doneBindedCallback = errorCheckingCallback.bind(done);
      fetchGithubReadMe(null, 'reponame', doneBindedCallback);
    });

    it('should handle empty repoName param', function (done) {
      var doneBindedCallback = errorCheckingCallback.bind(done);
      fetchGithubReadMe('scriptnull', null, doneBindedCallback);
    });

    it('should fetch readme content for correct values', function (done) {
      fetchGithubReadMe(process.env.BASE_LIST_AUTHOR,
        process.env.BASE_LIST_REPO,
        function (err, content) {
          if (err)
            return done(err);
          assert.deepEqual(typeof content, 'string');
          return done();
        }
      );
    });

    it('should pass error for invalid params', function (done) {
      fetchGithubReadMe('invalid', 'invalid',
        function (err, content) {
          if (err)
            return done();
          else
            return done(true);
        }
      );
    });

  });

  var childWorker;
  before(function () {
    childWorker = require('../child-worker/worker.js');
  });

  describe('child-worker/worker.js', function () {

    it('should handle 3 empty params', function (done) {
      try {
        childWorker();
      }
      catch (err) {
        if (err.message)
          done();
        else
          done(true);
      }
    });

    it('should handle 2 empty params', function (done) {
      var doneBindedCallback = errorCheckingCallback.bind(done);
      childWorker(null, null, doneBindedCallback);
    });

    it('should handle empty owner param', function (done) {
      var doneBindedCallback = errorCheckingCallback.bind(done);
      childWorker(null, 'reponame', doneBindedCallback);
    });

    it('should handle empty repoName param', function (done) {
      var doneBindedCallback = errorCheckingCallback.bind(done);
      childWorker('scriptnull', null, doneBindedCallback);
    });

    it('should fetch childWorker JSON for correct values', function (done) {
      childWorker(process.env.BASE_LIST_AUTHOR,
        process.env.BASE_LIST_REPO,
        function (err, content) {
          if (err)
            return done(err);
          assert.deepEqual(typeof content, 'object');
          return done();
        }
      );
    });

    it('should pass error for invalid params', function (done) {
      childWorker('invalid', 'invalid',
        function (err, content) {
          if (err)
            return done();
          else
            return done(true);
        }
      );
    });
  });

});
