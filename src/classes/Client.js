import io from 'socket.io-client';

//https://socket.io/docs/client-api/
class Client {
  constructor() {
    self = this;

    // this.socket = io.connect("http://localhost:3000"); //Funktionniert nur auf dem gleichen pc
     this.socket = io.connect("http://192.168.178.45:3000"); //Funktioniert im ganzen netzwerk. richtige IP eintragen

    console.log('connected ' , this.socket);

    this.socket.on('hi', function ( data ) {
      console.log("Data from Server: " , data);
    })
  }

  AddPlayer ( username ) {


    console.log("addPlayer" , username);
  }

  SendMessage ( message )
  {
    console.log(message);
  }

  SendMove ( playername, enemyname , fieldNr )
  {
    //PlayerUser sendet seinen Zug an EnemyPlayerUser

  }
}

export default Client;
