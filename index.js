require('app-module-path').addPath(__dirname);
require('app-module-path').addPath(__dirname + '/app/src');

const main = require('app/app');

main(__dirname);
