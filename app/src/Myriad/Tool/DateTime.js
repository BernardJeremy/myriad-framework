const libStore = require('Myriad/Loader/LibraryLoader').store;

module.exports.nowDate = function() {
  return libStore.strftime.date();
};

module.exports.nowTime = function() {
  return libStore.strftime.time();
};

module.exports.nowDateTime = function(separator = ' ') {
  return libStore.strftime.date() + separator + libStore.strftime.time();
};
