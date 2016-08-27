const path = require('path');
const glob = require("glob");

module.exports = function(targetPath, fileMask = '', options = {}) {
  return new Promise(function(fullfil, reject) {
    if (fileMask !== '' && fileMask !== null) {
      targetPath = path.join(targetPath, fileMask);
    }

    glob(targetPath, options, function (er, files) {
      if (er !== null) {
        reject('Error getting config files in ', configDirPath, ' : ', err);
      }
      let len = files.length;
      let filesArray = [];
      for (let i = 0; i < len; i++) {
        filesArray.push({
          'dir': path.dirname(files[i]),
          'fileName': path.basename(files[i]),
          'path':files[i],
        });
      }
      fullfil(filesArray);
    });
  });
};
