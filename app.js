var http = require('http');
var fs = require('fs');
var express = require('express');

var app = express();
 //Chargement du fichier index.html affiché au client
var server = http.createServer(function(req, res) {
fs.readFile('./index.html', 'utf-8', function(error, content) {
res.writeHead(200, {"Content-Type": "text/html"});
 res.end(content);
   });
});  



// Chargement de socket.io
var io = require('socket.io').listen(server); 

// Quand un client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {
    console.log('Un client est connecté !');
    socket.emit('message', 'Vous êtes bien connecté !');
	socket.broadcast.emit('message', 'Un autre client vient de se connecter !');


    socket.on('mon_session', function (pseudo) {
        socket.pseudo = pseudo ; 
        
    });


        
    // Quand le serveur reçoit un signal de type "message" du client    
    socket.on('message', function (message) {
        console.log(  socket.pseudo + 'Un client me parle ! Il me dit : ' + message);

    });	});


server.listen(3000);  