const path = require('path');

const GetDirContent = require('Myriad/Tool/GetDirContent');
const StringBetween = require('Myriad/Tool/StringBetween');
const FunctionConstant = require('Myriad/Constant/FunctionConstant');
const PathConstant = require('Myriad/Constant/PathConstant');

const relativeLibPaths = [
  PathConstant.APP_LIB_PATH,
];

module.exports.store = {};

function loadOneLibDir (libDirPath) {
  return new Promise(function(fullfil, reject) {
    GetDirContent(libDirPath, '*.js').then(function(files) {
      let len = files.length;
      for (let i = 0; i < len; i++) {
        let libName = StringBetween(files[i].fileName, '', '.');
        if(module.exports.store.hasOwnProperty(libName)){
          return reject('Duplicate lib name : ' + libName);
        }
        let obj = require(files[i].path);
        module.exports.store[libName] = obj;
        if (typeof obj[FunctionConstant.LIB_START_FCT] == 'function'){
          obj[FunctionConstant.LIB_START_FCT]();
        }
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
    for(let i= 0; i < relativeLibPaths.length; ++i)
    {
      let libDirPath = path.join(rootPath, relativeLibPaths[i]);
      promiseArray.push(loadOneLibDir(libDirPath));
    }
    Promise.all(promiseArray).then(function() {
      fullfil();
    }).catch(function(err) {
      reject(err);
    });

  });
};
