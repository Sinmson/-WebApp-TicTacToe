'use strict';

class TicTacToe
{

  constructor() {
    this.Playground = ['','','','','','','','',''];
    this.SymbolsMove = 'X';

  }

  SetField( fieldNr , symbol )
  {
    this.Playground[fieldNr] = symbol;

    if(symbol == 'X')
    {
      this.SymbolsMove = 'O';
    }
    else if(symbol == 'O')
    {
      this.SymbolsMove = 'X';
    }

    if(this.DidMoveWinTheGame(symbol))
    {
      this.SymbolsMove = false;
    }
    console.log("Switched SymbolsMove to " + this.SymbolsMove + " from " + symbol );
  }

  IsMoveValid( fieldNr , symbol )
  {
    if(!this.Playground[fieldNr] && symbol === this.SymbolsMove)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  IsTie()
  {
    var counter = 0;
    for(var i = 0; i < this.Playground.length; i++)
    {
      if(this.Playground[i])
      {
        counter++;
      }
    }

    return counter == 9;
  }


  FullWidht( symbol )
  {
    for ( var k = 0; k < 9; k = k + 3 )
    {
      var trueCounter = 0;
      for ( var i = 0; i < 3; i++ )
      {
        if ( this.Playground[ i + k ] == symbol )
        {
          trueCounter++;
        }
      }

      if ( trueCounter == 3 )
      {
        return true;
      }
    }

    return false;
  }

  FullHeight( symbol )
  {
    for ( var k = 0; k < 3; k++ )
    {
      var trueCounter = 0;
      for ( var i = 0; i < 9; i = i + 3 )
      {
        if ( this.Playground[ i + k ] == symbol )
        {
          trueCounter++;
        }
      }

      if ( trueCounter == 3 )
      {
        return true;
      }
    }

    return false;
  }

  FullCross( symbol )
  {
    var trueCounter = 0;
    for ( var k = 0; k < 9; k = k + 4 )
    {
      if ( this.Playground[ k ] == symbol )
      {
        trueCounter++;
      }
    }
    if ( trueCounter == 3 )
    {
      return true;
    }

    trueCounter = 0;
    for ( var k = 2; k < 7; k = k + 2 )
    {
      if ( this.Playground[ k ] == symbol )
      {
        trueCounter++;
      }
    }
    if ( trueCounter == 3 )
    {
      return true;
    }

    return false;
  }

  DidMoveWinTheGame( symbol )
  {
    if ( this.FullWidht( symbol ) )
    {
      return true;
    }

    if ( this.FullHeight( symbol ) )
    {
      return true;
    }

    if ( this.FullCross( symbol ) )
    {
      return true;
    }

    return false;
  }
}

export default TicTacToe;
