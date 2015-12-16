var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var fs = require('fs');
var assets = require('./http-helpers.js');

exports.handleRequest = function (req, res) {
  assets.serveAssets(res);
};
