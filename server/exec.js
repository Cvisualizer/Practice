var exec = require('child_process').exec,child;
var fs = require('fs');
var http = require('http');
var async=require('async');

var code="";
var source={};

function writeFile(){
    fs.writeFileSync('hoge.c', code);
    console.log("readed!");
}
 
var server=http.createServer(function (request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end();
});

var io=require('socket.io').listen(server);
  io.sockets.on('connection',function(socket){
  //console.log(source.info.max);
  socket.on("message",function(data){
    code=data;
    console.log("connected!");
    writeFile();
     async.series([
      function (callback){
        exec('./Compiler '+'hoge.c',
        // exec関数は非同期関数なのでcallbackを取り、そこでstdout, stderrを取る
        function (error, stdout, stderr) {
        source = (new Function("return " + stdout))();
        if (error !== null) {
          console.log('exec error: ' + error);
        }
        console.log(source);
        callback();
      });
       },
       function (callback){
        console.log("compiled!");
        callback();
       },
       function (callback){
        socket.emit('greeting',source,function(data){});
        console.log('emmit to client!');
       }
    ])
  });
});

server.listen(8000);
 
console.log('Server running at http://127.0.0.1:8000/');
