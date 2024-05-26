// Create web server
var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');

var comments = {
  "1": "This is a comment",
  "2": "This is another comment"
};

var server = http.createServer(function(req, res) {
  var urlParts = url.parse(req.url);
  var path = urlParts.path;
  var method = req.method;

  if (path === '/comments' && method === 'GET') {
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.end(JSON.stringify(comments));
  } else if (path === '/comments' && method === 'POST') {
    var body = [];
    req.on('data', function(chunk) {
      body.push(chunk);
    }).on('end', function() {
      body = Buffer.concat(body).toString();
      var newCommentId = Object.keys(comments).length + 1;
      comments[newCommentId] = body;
      res.writeHead(201, {
        'Content-Type': 'application/json'
      });
      res.end(JSON.stringify({
        id: newCommentId
      }));
    });
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/plain'
    });
    res.end('Not found');
  }
});

server.listen(3000, function() {
  console.log('Server is listening on port 3000');
});