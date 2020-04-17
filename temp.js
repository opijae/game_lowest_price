var http = require('http');
var url = require('url');
var fs = require('fs');
var querystring = require('querystring');
http.createServer(function(req, res){
  if(req.method == 'GET') {
    fs.readFile('./docRoot/form.html', function(err, data) {
       res.writeHead(200, {'Content-Type':'text/html'});
       res.end(data); });
      } else if(req.method =='POST') {
        req.on('data', function(chunk) {
           console.log(chunk.toString());
            var data = querystring.parse(chunk.toString());
            res.writeHead(200, {'Content-Type':'text/html'});
             res.end('id : ' + data.id + 'pwd : ' + data.pwd);
            });
          }
        }).listen(8888, function(){ console.log('server running on 8888.'); });
