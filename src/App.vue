<template>
  <md-layout md-column id="app" class="bg-clouds">
    <md-whiteframe md-tag="md-toolbar" md-elevation="2" class="md-primary" >
      <div class="md-toolbar-container">
        <md-button class="md-icon-button" @click.native="toggleSidenav">
          <md-icon>menu</md-icon>
        </md-button>

        <h1 class="md-title cl-clouds">TicTacToe</h1>

        <span style="flex: 1"></span>

        <md-button class="md-icon-button">
          <md-icon>search</md-icon>
        </md-button>

        <md-button class="md-icon-button">
          <md-icon>view_module</md-icon>
        </md-button>
      </div>
    </md-whiteframe>
    <md-sidenav class="md-left" ref="sidenav" md-swipeable @open="open('Left')" @close="close('Left')">
      <md-whiteframe md-tag="md-toolbar" md-elevation="2" class="md-primary">
        <div class="md-toolbar-container">
          <h3 class="md-title">History</h3>
        </div>
      </md-whiteframe>

      <md-list>
        <md-list-item v-for="(game, index) in games" :key="game">
          <i  :class="cssWinner(game)" class="md-icon mdi mdi-trophy mdi-24px"></i> <span> Gegen {{game.enemyname}}</span>
        </md-list-item>
      </md-list>
    </md-sidenav>



    <!-- <md-layout md-flex="25"></md-layout> -->

    <md-layout  md-column md-flex="100" md-align="center" class="main-content">
      <md-layout id="searchbox" v-show="!enemyFound" md-tag="md-card" md-gutter="40" md-column md-flex="50" md-flex-xsmall="90" md-align="center">
        <md-layout md-tag="md-card-content" md-flex="100">
          <md-input-container @:click="handleSearchGamePressed()">
            <md-input autofocus @keyup.enter.native="handleSearchGamePressed()"  v-model="playername" :disabled="inQueue || enemyFound" type="text" placeholder="Spielername">

            </md-input>
          </md-input-container>
        </md-layout>
        <md-layout  class="space-between" md-row md-tag="md-card-actions" md-flex="100">
          <md-button @click.native="handleSearchGamePressed()" class="md-raised bg-clouds" :disabled="inQueue">
              Suche Spiel...
          </md-button>
        </md-layout>
      </md-layout>
      <md-layout v-if="inQueue" id="loader" md-column md-align="center">
        <md-spinner :md-size="150" :md-indeterminate="inQueue || enemyFound" >
        </md-spinner>
        <md-layout md-tag="h3" md-hide-xsmall class="md-Title"> Suche Gegner ....</md-layout>
      </md-layout>


      <md-layout id="MatchPlayers" v-if="enemyFound && !inQueue" md-row md-align="center">
        <div class="md-display-2">{{playername}} vs. {{enemyname}}</div>
      </md-layout>

      <md-layout v-if="enemyFound && !inQueue" md-column class="align-items-center" md-align="center">
      <!-- <md-layout md-column class="align-items-center" md-align="center"> -->
        <md-layout id="playground" md-row md-flex="50" md-align="center">
          <div>
            <div v-bind:class="{ 'clickable' : ticTacToe.IsMoveValid(3 , 'X') }" class="field md-whiteframe-3dp" @click="fieldPressed(0)" >
              <div>
                {{ticTacToe.Playground[0]}}
              </div>
            </div>
            <div :class="{ 'clickable' : ticTacToe.IsMoveValid(3 , 'X') }" class="field md-whiteframe-3dp" @click="fieldPressed(3)" >
              <div>
              {{ticTacToe.Playground[3]}}
              </div>
            </div>
            <div :class="{ 'clickable' : ticTacToe.IsMoveValid(6 , 'X') }" class="field md-whiteframe-3dp" @click="fieldPressed(6)" >
              <div>
              {{ticTacToe.Playground[6]}}
              </div>
            </div>
          </div>
          <div>
            <div :class="{ 'clickable' : ticTacToe.IsMoveValid(1 , 'X') }" class="field md-whiteframe-3dp" @click="fieldPressed(1)" >
              <div>
              {{ticTacToe.Playground[1]}}
              </div>
            </div>
            <div :class="{ 'clickable' : ticTacToe.IsMoveValid(4 , 'X') }" class="field md-whiteframe-3dp" @click="fieldPressed(4)" >
              <div>
              {{ticTacToe.Playground[4]}}
              </div>
            </div>
            <div :class="{ 'clickable' : ticTacToe.IsMoveValid(7 , 'X') }" class="field md-whiteframe-3dp" @click="fieldPressed(7)" >
              <div>
              {{ticTacToe.Playground[7]}}
              </div>
            </div>
          </div>
          <div>
            <div :class="{ 'clickable' : ticTacToe.IsMoveValid(2 , 'X') }" class="field md-whiteframe-3dp" @click="fieldPressed(2)" >
              <div>
              {{ticTacToe.Playground[2]}}
              </div>
            </div>
            <div :class="{ 'clickable' : ticTacToe.IsMoveValid(5 , 'X') }" class="field md-whiteframe-3dp" @click="fieldPressed(5)" >
              <div>
              {{ticTacToe.Playground[5]}}
              </div>
            </div>
            <div :class="{ 'clickable' : ticTacToe.IsMoveValid(8 , 'X') }" class="field md-whiteframe-3dp" @click="fieldPressed(8)" >
              <div>
              {{ticTacToe.Playground[8]}}
              </div>
            </div>
          </div>
        </md-layout>
      </md-layout>

      <md-layout id="winner" v-if="enemyFound && !inQueue && (wonPlayername || isTie)" md-row md-align="center">
        <h1 class="md-display-1" v-if="!isTie">Gewinner: {{wonPlayername}}</h1>
        <h1 class="md-display-1" v-if="isTie">Unentschieden!</h1>
      </md-layout>
      <md-layout md-flex="50" v-if="enemyFound && !inQueue && (wonPlayername || isTie)" md-row md-align="center">
        <md-layout  md-align="center" md-row md-tag="md-card-actions" md-flex="50">
          <md-button class="md-raised bg-clouds">
            <div class="" v-on:click="addPlayerToQueue()">
              Neu suchen...
            </div>
          </md-button>
        </md-layout>
      </md-layout>
      <md-layout id="chat" v-show="enemyFound && !inQueue" class="nowrap" md-column>
        <md-layout id="messageScrollerContainer" class="margin-top-auto messages" md-flex="100">
          <md-layout md-flex="100" md-hide-xsmall class="message" v-for="(chatmessage, index) in chatmessages" :key="chatmessage">
            <strong>{{chatmessage.sendername}}:</strong>&nbsp;{{chatmessage.message}}
          </md-layout>
        </md-layout>
        <md-layout md-flex="100">
          <md-input-container  class="md-input-placeholder">
            <md-input @keyup.enter.native="sendMessage()" v-model="chatmassage" :disabled="!inQueue && !enemyFound" type="text" placeholder="Nachricht...">

            </md-input>
            <button type="button" class="md-button md-icon-button md-toggle-password md-theme-default"> <i aria-hidden="true" class="md-icon md-theme-default material-icons">visibility</i><div class="md-ink-ripple"><div class="md-ripple md-fadeout md-active" style="width: 40px; height: 40px; top: 12px; left: 0.046875px;"></div></div></button>
          </md-input-container>
        </md-layout>
        <md-layout class="messages nowrap" md-column md-flex="100">
          <div class="message md-flex-100 md-hide-small-and-up" v-for="(chatmessage, index) in chatmessagesReversed" :key="chatmessage">
            <strong>{{chatmessage.sendername}}:</strong>&nbsp;{{chatmessage.message}}
          </div>
        </md-layout>
      </md-layout>
    </md-layout>


  </md-layout>


</template>

<script>
import TicTacToe from './classes/TicTacToe.js';
import Io from 'socket.io-client';

var data = {
  ticTacToe : new TicTacToe(),
  inQueue : false,
  playernames : [],
  playername : '',
  enemyname : '',
  chatmessages : [
    {
      sendername: 'Judith',
      message: 'Hallo'
    },
    {
      sendername: 'Tim',
      message: 'Hi!'
    },
    {
      sendername: 'Judith',
      message: 'Was geht ab?'
    },
    {
      sendername: 'Tim',
      message: 'Nicht viel, bei dir?'
    }
  ],
  chatmassage : '',
  enemyFound : false,
  wonPlayername : '',
  isTie : false,
  games : [
    {
      moves : 3,
      enemyname : 'Niklas',
      won: false
    },
    {
      moves : 3,
      enemyname : 'Niklas',
      won: true
    },
    {
      moves : 3,
      enemyname : 'Niklas',
      won: true
    }
  ]
}

// var socket = Io.connect("http://localhost:3000"); //Funktionniert nur auf dem gleichen pc
 var socket = Io.connect("http://192.168.178.45:3000"); //Funktioniert im ganzen netzwerk. richtige IP eintragen

console.log('connected ' , socket);


socket.on("enemyFound" , function ( gameroom ) {
  var p1 = gameroom.player1;
  var p2 = gameroom.player2;

  if(p1 == data.playername)
  {
    data.enemyname = p2;
  }
  else
  {
    data.enemyname = p1;
  }
  console.log("enemyFound: Init game");
  data.wonPlayername = false;
  data.inQueue = false;
  data.enemyFound = true;
  data.chatmassage = '';
  data.isTie = false;
  data.chatmessages = [];
});

socket.on("moved", function ( fieldNr , moveFromPlayername ) {
  console.log("MOVED : " , fieldNr);
  var symbol = 'O';

  if(moveFromPlayername == data.playername)
  {
    symbol = 'X'
  }

  data.ticTacToe.SetField( fieldNr , symbol );
  console.log(data.ticTacToe);
  if(data.ticTacToe.DidMoveWinTheGame(symbol))
  {
    data.wonPlayername = moveFromPlayername;
  }
  else if(data.ticTacToe.IsTie())
  {
    data.isTie = true;
  }


  data.ticTacToe.Playground.__ob__.dep.notify();
  console.log(data.ticTacToe);
});

var scrollChatDown = function() {
  var container = document.querySelector("#messageScrollerContainer");
  container.scrollTop = container.scrollHeight + 24;
}

var getSwappedArr = function(arrayToSwap) {
  var array = JSON.parse(JSON.stringify(arrayToSwap));
  var left = null;
  var right = null;
  var length = array.length;
  for (left = 0; left < length / 2; left += 1)
  {
      right = length - 1 - left;
      var temporary = array[left];
      array[left] = array[right];
      array[right] = temporary;
  }
  return array;
}

socket.on("messaged", function (message) {
  console.log("Got a message" , message.sendername , message.message);
  data.chatmessages.push(message);
  data.chatmessages.__ob__.dep.notify();
});

var charScroler = setInterval(scrollChatDown , 500);




export default {
  name: 'app',
  data () {
    return data;

  },
  methods : {
    sayHello() {
      console.log("Hi, I am here to say hello.");
    },
    toggleSidenav() {
      this.$refs.sidenav.toggle();
    },
    open(ref) {
      console.log('Opened: ' + ref);
    },
    close(ref) {
      console.log('Closed: ' + ref);
    },
    cssWinner(game) {
      var returnMsg = "lost";
      if(game.won)
      {
        returnMsg = "won";
      }
      return returnMsg;
    },
    fieldPressed ( fieldNr )   {
      console.log(" Field " + fieldNr + " pressed. ");

      if(this.ticTacToe.IsMoveValid( fieldNr , 'X'))
      {
        this.sendMove ( fieldNr );

        console.log("Clicked " + fieldNr , this.ticTacToe.Playground);
      }
    },
    handleSearchGamePressed() {
      this.inQueue=true;
      this.addPlayer();
      this.addPlayerToQueue();
    },

    addPlayer() {
      console.log("Add player " , this.playername);
      socket.emit("addPlayer", this.playername);
    },
    addPlayerToQueue() {
      console.log("Add player to Queue " , this.playername);

      data.ticTacToe = new TicTacToe();
      data.wonPlayername = false;
      data.inQueue = true;
      data.enemyFound = false;

      socket.emit("addPlayerToQueue", this.playername);
    },

    sendMove( fieldNr ) {
      socket.emit("move" , fieldNr) , 'X';
    },
    sendMessage() {
      socket.emit("message", {sendername: this.playername , message: this.chatmassage});

      this.chatmassage = '';
    },
    fakeEnemyFound() {
      this.inQueue = false;
      this.enemyFound = true;
      this.enemyname = 'Kuruneko';
    }
  },
  watch: {
    // 'chatmessages' : {
    //   deep: true,
    //   handler: function (val, oldVal) {
    //     scrollChatDown();
    //   }
    // }
  },
  computed: {
    chatmessagesReversed : function () {
      return getSwappedArr(this.chatmessages);
    }
  }
}


</script>

<style lang="scss">
  $midnight-blue: #2c3e50;
  $clouds : #ecf0f1;
  $primary: #303F9F;

  .lost {
    color: #E91E63 !important;
  }

  .won {
    color: #8BC34A !important;
  }

  #searchbox {
    margin: 50px auto auto auto;
    padding: 8px;
    margin-bottom: 50px;

    & .md-card-content {
      padding: 8px;

      & .md-input-container {
        padding-top: 15px;
        margin-bottom: 10;
        height: 30px;
      }
    }
  }
  #playground {
    & .field {
      background-color: $primary;
      height: 100px;
      width: 100px;
      margin: 5px;
      cursor: default;

      transition: all 1s ease-in-out;

      & > div {
        height: 100%;
        width: 100%;
        text-align: center;
        line-height: 100px;
        vertical-align: middle;
        font-size: 62px;
        background-color: $clouds; /*.mdl-color--indigo-700*/
        color: transparent;
        text-shadow: 0 0px 12px rgba(0,0,0,.05);
        /*filter: drop-shadow();*/
        -webkit-background-clip: text;
        -moz-background-clip: text;
        background-clip: text;
      }

      @media (min-width: 1000px) {
          height: 150px;
          width: 150px;

          & > div {
            font-size: 87px;
            line-height: 150px;
          }
        }
    }
  }

  #loader {
    align-items: center;
  }

  .clickable {
    cursor: pointer !important;
  }

  .main-content {
    min-height: 100%;
    z-index: 100;
  }

  #chat {
    position: absolute;
    bottom: 0;
    right: 0;
    min-height: 300px;
    max-height: 70vh;
    width: 300px;

    @media (max-width: 600px) {
      margin-bottom: 20px;
      margin-top: 10px;
      right: 0;
      left: 0;
      margin-left: auto;
      margin-right: auto;
      position: static;

      & .messages {
        margin-top: 0 !important;
      }
    }

    & .messages {
      overflow: hidden;
      max-height: 500px;
      z-index: 1;
      padding: 0;
      & .message {
        margin: 2px 0;
        width: 100%;
        max-width: 100%;
      }
    }
  }

  #MatchPlayers {
    margin-bottom: 30px;
    margin-top: 50px;

    @media (max-width: 600px) {
      margin-bottom: 20px;
      margin-top: 10px;
    }
  }

  @media (max-width: 600px) {
    .md-display-2 {
      font-size: 30px;
    }
  }



</style>
