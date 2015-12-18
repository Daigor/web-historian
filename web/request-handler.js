var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var fs = require('fs');
var assets = require('./http-helpers.js');

var checkForAsset = function(url, res, req) {
  // console.log(url, 'line 8');
  archive.isUrlInList(url, function(is) {
   
    if(is) {  
      archive.isUrlArchived(url, function(is) {
        if(is){
          //send the page
          assets.serveAssets(res, archive.paths.archivedSites + "/" + url, 200)
        } else{
          // serve the loading 302
          assets.serveAssets(res, archive.paths.siteAssets + '/loading.html', 302); 
        }
      })

    //all this happens only if the url is not int he list at all.  
    } else {
      //put it in the list and send user to loading page
      if(req.method === "GET") {
        res.writeHead(404, assets.headers);
        res.end();
      } else if(req.method === "POST"){
        //add it to the list 
        archive.addUrlToList(url, function(){
        });
        // serve the loading 302
        assets.serveAssets(res, archive.paths.siteAssets + '/loading.html', 302); 
      }    
    }
  })
}

exports.handleRequest = function (req, res) {
  console.log(req.method, "what method is this", req.url, "req.url");
  if(req.method === "GET" && req.url === "/") {
    console.log("url from inside", req.url);
    assets.serveAssets(res, archive.paths.siteAssets + '/index.html', 200);
  }

  if(req.method === "GET" && req.url !== "/") {
    //   /www.google.com
    //assets.serveAssets(res, archive.paths.siteAssets + '/index.html');
    checkForAsset(req.url.slice(1), res, req);
  }
  //req.method === "GET" req.url === "/"

  if(req.method === "POST") {
    var dataChunk = "";
    req.on('data', function(chunk) {
      dataChunk += chunk;
    });
    req.on('end', function() {
      var url = dataChunk.slice(4);
      // var url = JSON.parse(dataChunk);
      // console.log(url.url);
      checkForAsset(url, res, req);
    });
  }
}

