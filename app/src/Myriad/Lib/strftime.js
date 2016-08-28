const configStore = require('Myriad/Loader/ConfigLoader').store;
const strftime = require('strftime').timezone(configStore.app.timezone);

module.exports.date = function (date = new Date()) {
  return strftime(configStore.app.date_format, new Date(date));
};

module.exports.time = function (time = new Date()) {
  return strftime(configStore.app.time_format, new Date(time));
};

module.exports.addHelpers = function(app) {
  app.locals.time = module.exports.time;
  app.locals.date = module.exports.date;
};
