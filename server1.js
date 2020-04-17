var express=require('express');
var http=require('http');
var fs=require('fs');
var ejs=require('ejs');
var querystring = require('querystring');

var app=express();
var content = fs.readFileSync('./HTMLPage.ejs', 'utf-8');
var compiled = ejs.compile(content);

var kkk=new Array();

var server=http.createServer(app);
server.listen(52273,function(){
  console.log('server running');

})
var gametitle='lk';

  app.get('/', function (request, response) {
      fs.readFile('HTMLPage.ejs', function (error, data) {
        response.send(data.toString());

      });
  });

app.post('/',function(request,response){
  request.on('data',function(chunk){
    //console.log(chunk.toString());
    var data=querystring.parse(chunk.toString());
    response.writeHead(200, {'Content-Type':'text/html'});
    exports.game_title = function(){
      return chunk.toString();
    }
    var main=require('./main');

    });
  });

app.get('/result',function(request,response){
      //  var data=
        var main=require('./main');
        var gameinfo=new Object();
        var total=new Array();
        var game_title=main.games_title();
        var game_price=main.games_price();
        for(var i=0;i<game_price.length;i++){
          total[i]=new Array();
          total[i][0]=game_title[i];
          total[i][1]='<br>';
          total[i][2]='\t'+game_price[i];
          total[i][3]='<br>';
        }
        response.write('hello\n');
        response.write("<h1>"+'----------Output---------'+"</h1>");
        response.end(total+'</br>');

      //response.end();
})
