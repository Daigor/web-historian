var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var fs = require('fs');
var assets = require('./http-helpers.js');

exports.handleRequest = function (req, res) {
  console.log(req.method, "what method is this", req.url, "req.url");
  assets.serveAssets(res);
  if(req.method === "POST") {
    var dataChunk = "";
    req.on('data', function(chunk) {
      dataChunk += chunk;
    });
    req.on('end', function() {
      console.log(dataChunk);
      var url = dataChunk.slice(4);
      exports.isUrlInList(url, function(is) {
        if(is) {
          exports.isUrlIsArchived(url, function(is) {
            if(is){
              //send the page
            } else{
              //send to loading page

            }
          })
        } else {
          //put it in the list and send user to loading page
                      
        }
      })
    });
  }
};
