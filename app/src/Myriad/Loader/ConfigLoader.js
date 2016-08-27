const path = require('path');

const GetDirContent = require('Myriad/Tool/GetDirContent');
const StringBetween = require('Myriad/Tool/StringBetween');

const relativeConfigPaths = [
  'app/config/',
];

module.exports.config = {};

function loadOneConfigDir (configDirPath) {
  return new Promise(function(fullfil, reject) {
    GetDirContent(configDirPath, '*.config.json').then(function(files) {
      let len = files.length;
      for (let i = 0; i < len; i++) {
        let configName = StringBetween(files[i].fileName, '', '.');
        if(module.exports.config.hasOwnProperty(configName)){
          return reject('Duplicate config name : ' + configName);
        }
        let obj = require(files[i].path);
        module.exports.config[configName] = obj;
      }
      fullfil();
    }).catch(function(err) {
      reject(err);
    });
  });
}


module.exports.load = function(rootPath) {
  return new Promise(function(fullfil, reject) {
    let promiseArray = [];
    for(let i= 0; i < relativeConfigPaths.length; ++i)
    {
      let configDirPath = path.join(rootPath, relativeConfigPaths[i]);
      promiseArray.push(loadOneConfigDir(configDirPath));
    }
    Promise.all(promiseArray).then(function() {
      fullfil();
    }).catch(function(err) {
      reject(err);
    });

  });
};
