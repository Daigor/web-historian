var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var htmlFetcher = require('../workers/htmlFetcher.js');
var chron = require('chron');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  fs.readFile(exports.paths.list, 'utf-8', function(err, data) {
    if(err) {
      throw err;
    }

    callback(data.split("\n"));
  });
};

exports.isUrlInList = function(url, callback){
  exports.readListOfUrls(function(urls) {
    var isInList = false;
    for(var i = 0; i < urls.length; i++) {
      if(urls[i] === url) {
        isInList = true;
      }
    }
    callback(isInList);
  });
};

exports.addUrlToList = function(url, callback){
  fs.appendFile(exports.paths.list, url + "\n", function(err){
    if(err){
      throw err
    }
    callback();
  });
};

exports.isUrlArchived = function(url, callback){
  fs.readdir(exports.paths.archivedSites, function(err, data) {
    if(err) {
      throw err;
    }
    var isInUrl = false;
    for(var i = 0; i < data.length; i++) {
      if(url === data[i]) {
        isInUrl = true;
      }
    }
    callback(isInUrl);
  })
};

exports.downloadUrls = function(url){
  //url === [example1.com, example2.com]
  for(var i = 0; i < url.length; i++) {
    htmlFetcher.fetchHtml(url[i]);
  }

};


