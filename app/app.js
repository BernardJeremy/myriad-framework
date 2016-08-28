const configLoader = require('Myriad/Loader/ConfigLoader');
const libLoader = require('Myriad/Loader/LibraryLoader');

module.exports = function (rootPath) {
  console.log('App started');
  console.log('Loading config');
  configLoader.load(rootPath).then(function() {
    console.log('All config loaded :', configLoader.store);
    libLoader.load(rootPath).then(function() {
      console.log('All library loaded :', libLoader.store);
    }).catch(function(err) {
      console.log(err);
    });
  }).catch(function(err) {
    console.log(err);
  });
};
