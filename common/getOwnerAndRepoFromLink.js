module.exports = getOwnerAndRepoFromLink;

function getOwnerAndRepoFromLink (link) {
  if (!link) return null;
  if (link.indexOf('https://github.com/') < 0) return null;
  var splittedArray = link.replace('https://github.com/', '').split('/');
  return {
    owner : splittedArray[0],
    repoName : splittedArray[1],
    link : link
  };
}
