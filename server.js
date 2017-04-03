//https://socket.io/docs/server-api/
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
playernames = {};
playerQueue = {};
sockets = {};
gamerooms = {};

Object.prototype.getKeyByValue = function( value ) {
  for( var prop in this ) {
      if( this.hasOwnProperty( prop ) ) {
           if( this[ prop ] === value )
               return prop;
      }
  }
}

server.listen(process.env.PORT || 3000);
console.log('Server running...');

app.use(express.static(__dirname + '/'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connect', onConnect);


function onConnect(socket)
{
  sockets[socket.id] = socket;
  console.log('Connected: %s sockets connected', Object.keys(sockets).length);

  socket.on('message', function(data){
    console.log(data);
  });

  socket.on("addPlayer", function (playername) {
    addPlayerTo(socket.id , playername , playernames);
  });

  socket.on("removePlayer", function (playername) {
    removePlayerFrom(socket.id, playernames);
  });

  socket.on("addPlayerToQueue", function (playername) {
    addPlayerTo(socket.id , playername , playerQueue);
    var matchedGameroomName;
    var i = 0;
    while(matchedGameroomName = getPlayerGameroomname(playername) && i < 20)
    {
      socket.leave(matchedGameroomName);
    }

    var keys = Object.keys(playerQueue);
    if(keys.length == 2)
    {

      var namesSorted = [];
      for (var i = 0; i < keys.length; i++) {
          namesSorted.push(playerQueue[keys[i]]);
      }
      namesSorted = namesSorted.sort();

      var gameroomName = "gameroom_" + namesSorted[0] + "_" + namesSorted[1];
      var plIds = [];
      for(var i = 0; i < 2; i++)
      {
        var plId = playernames.getKeyByValue(namesSorted[i]);
        plIds.push(plId);
        var plSocket = sockets[plId];
        plSocket.join(gameroomName);
      }

      gamerooms[gameroomName] = {
        player1 : namesSorted[0],
        player1_Id : plIds[0],
        player2 : namesSorted[1],
        player2_Id : plIds[1],
      }

      io.in(gameroomName).emit('enemyFound', gamerooms[gameroomName]);

      removePlayerFrom(gamerooms[gameroomName].player1_Id, playerQueue);
      removePlayerFrom(gamerooms[gameroomName].player2_Id, playerQueue);
    }
  });

  socket.on("move" , function ( fieldNr , symbol ) {
    var playername = playernames[socket.id];
    var matchedGameroomName = getPlayerGameroomname(playername);

    console.log("MOVE : " , fieldNr , playername , matchedGameroomName);

    if(matchedGameroomName)
    {
      io.in(matchedGameroomName).emit('moved', fieldNr , playername);
    }
  });

  socket.on("removePlayerFromQueue", function (playername) {
    removePlayerFrom(socket.id, playerQueue);
  });

  socket.on('disconnect', function(data){
    removePlayerFrom(socket.id , sockets);
    console.log('Disconnected: %s sockets connected', Object.keys(sockets).length);
    console.log("");

    //Spieler aus gameroom entfernen
    var playername = playernames[socket.id];
    var matchedGameroomName;
    var i = 0;
    while(matchedGameroomName = getPlayerGameroomname(playername) && i < 20)
    {
      socket.leave(matchedGameroomName);
      i++;
    }
    console.log(io.sockets.adapter.rooms);

    removePlayerFrom(socket.id, playernames);
    removePlayerFrom(socket.id, playerQueue);
  });

  addPlayerTo = function(id, playername , arr)
  {
    arr[id] = playername;
  }

  removePlayerFrom = function(id , arr)
  {
    delete arr[id];
  }

  getPlayerGameroomname = function(playername)
  {
    var gameroomNames = Object.keys(gamerooms);
    var matchedGameroomname = false;

    for(var i = 0; i < gameroomNames.length; i++)
    {
      if(gameroomNames[i].includes(playername))
      {
        matchedGameroomname = gameroomNames[i];
      }
    }

    return matchedGameroomname;
  }

  /*

  // sending to the client
  socket.emit('hello', 'can you hear me?', 1, 2, 'abc');

  // sending to all clients except sender
  socket.broadcast.emit('broadcast', 'hello friends!');

  // sending to all clients in 'game' room except sender
  socket.to('game').emit('nice game', "let's play a game");

  // sending to all clients in 'game1' and/or in 'game2' room, except sender
  socket.to('game1').to('game2').emit('nice game', "let's play a game (too)");

  // sending to all clients in 'game' room, including sender
  io.in('game').emit('big-announcement', 'the game will start soon');

  // sending to all clients in namespace 'myNamespace', including sender
  io.of('myNamespace').emit('bigger-announcement', 'the tournament will start soon');

  // sending to individual socketid (private message)
  socket.to(<socketid>).emit('hey', 'I just met you');

  // sending with acknowledgement
  socket.emit('question', 'do you think so?', function (answer) {});

  // sending without compression
  socket.compress(false).emit('uncompressed', "that's rough");

  // sending a message that might be dropped if the client is not ready to receive messages
  socket.volatile.emit('maybe', 'do you really need it?');

  // sending to all clients on this node (when using multiple nodes)
  io.local.emit('hi', 'my lovely babies');
  */
}
