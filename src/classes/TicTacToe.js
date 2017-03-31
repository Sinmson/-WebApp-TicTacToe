'use strict';

class TicTacToe
{

  constructor() {
    this._playground = ['','','','','','','','',''];
  }

  FullWidht( symbol )
  {
    for ( var k = 0; k < 9; k = k + 3 )
    {
      var trueCounter = 0;
      for ( var i = 0; i < 3; i++ )
      {
        if ( this._playground[ i + k ] == symbol )
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
        if ( this._playground[ i + k ] == symbol )
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
      if ( this._playground[ k ] == symbol )
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
      if ( this._playground[ k ] == symbol )
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

  DoesMoveWinTheGame( symbol )
  {
    if ( FullWidht( symbol ) )
    {
      return true;
    }

    if ( FullHeight( symbol ) )
    {
      return true;
    }

    if ( FullCross( symbol ) )
    {
      return true;
    }

    return false;
  }
}

export default TicTacToe;
