// Create web server
var http = require('http');
var fs = require('fs');
var path = require('path');
var comments = require('./comments');
var mime = require('mime');
var url = require('url');

var server = http.createServer(function(request, response) {
  var urlPath = url.parse(request.url).pathname;
  var filePath = path.join(__dirname, urlPath);
  console.log(filePath);
  if (urlPath === '/comments.json') {
    comments.get(function(err, data) {
      if (err) {
        response.writeHead(500, {
          'Content-Type': 'text/plain'
        });
        response.end(err);
        return;
      }
      response.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      response.end(data);
    });
  } else {
    fs.exists(filePath, function(exists) {
      if (exists) {
        fs.readFile(filePath, function(err, data) {
          if (err) {
            response.writeHead(500, {
              'Content-Type': 'text/plain'
            });
            response.end(err);
            return;
          }
          response.writeHead(200, {
            'Content-Type': mime.lookup(filePath)
          });
          response.end(data);
        });
      } else {
        response.writeHead(404, {
          'Content-Type': 'text/plain'
        });
        response.end('404 Not Found\n');
      }
    });
  }
});

server.listen(3000, function() {
  console.log('Server is listening on port 3000');
});