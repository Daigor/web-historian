// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var request = require('request');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.fetchHtml = function(url) {
  request('http://' + url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      fs.writeFile(archive.paths.archivedSites + "/" + url, body, 'utf-8', function(err) {
        if(err) {
          throw err;
        }
        console.log("saved!");
      });
    }
  });
}

