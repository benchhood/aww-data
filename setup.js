module.exports = setup;

var envsJson = require('./env.json');
var Logger = require('./common/logger.js');
var main = require('./main.js');
var logger = new Logger(setup.name);

function setup() {

  var envs = [
    'baseListAuthor',
    'baseListRepo',
    'dataPath',
    'githubApiBaseUrl',
    'githubApiToken'
  ];

  var isParameterMissing = false;
  envs.forEach(
    function (envName) {
      if (!envsJson[envName]) {
        logger.error(envName + ' not found in the env.json');
        isParameterMissing = true;
      }
    }
  )

  if (isParameterMissing)
    return;

  process.env.BASE_LIST_AUTHOR = envsJson.baseListAuthor;
  process.env.BASE_LIST_REPO = envsJson.baseListRepo;
  process.env.DATA_PATH = envsJson.dataPath;
  process.env.GITHUB_API_BASE_URL = envsJson.githubApiBaseUrl;
  process.env.GITHUB_API_TOKEN = envsJson.githubApiToken;

  return true;
}
