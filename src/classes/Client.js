import TicTacToe from './TicTacToe.js'
import io from 'socket.io-client'

//https://socket.io/docs/client-api/
class Client {
  constructor() {
    this.Usernames = [];
    this.PlayerUser = 'Sinmson';
    this.EnemyPlayerUser = '';
    this.TicTacToeM = new TicTacToe();
    this.Chatmessages = [];
    this.EnemyFound = false;
    this.PlayerWon = false;
    this.IsTie = false;
    this.WonPlayername = '';
    this.socket = io.connect("http://localhost:3000");
    console.log('connected ' , this.socket);

    this.socket.on('hi', function ( data ) {
      console.log("Data from Server: " , data);
    })
  }



  sendMessage ( message )
  {
    console.log(message);
  }


  sendMove ( fieldNr )
  {
    //PlayerUser sendet seinen Zug an EnemyPlayerUser

  }

  fieldPressed ( fieldNr )
  {
    //Zug prüfen -> Spielfeld aktualisieren -> Zug senden
  }
}

export default Client;
