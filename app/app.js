const configLoader = require('Myriad/Loader/ConfigLoader');

module.exports = function (rootPath) {
  console.log('App started');
  console.log('Loading config');
  configLoader.load(rootPath).then(function() {
    console.log('All config loaded :', configLoader.config);
  }).catch(function(err) {
    console.log(err);
  });
};
