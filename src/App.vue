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
        <md-list-item v-for="(game, index) in client.Games" :key="game">
          <i  :class="cssWinner(game)" class="md-icon mdi mdi-trophy mdi-24px"></i> <span> Gegen {{game.enemyname}}</span>
        </md-list-item>
      </md-list>
    </md-sidenav>



    <!-- <md-layout md-flex="25"></md-layout> -->

    <md-layout id="searchbox" md-tag="md-card" md-gutter="40" md-column class="main-content" md-flex="50" md-align="center">
      <md-layout md-tag="md-card-content" md-flex="100">
        <md-input-container >
          <md-input v-model="client.Playername" type="text" placeholder="Spielername">

          </md-input>
        </md-input-container>
      </md-layout>
      <md-layout class="space-between" md-row md-tag="md-card-actions" md-flex="100">
        <!-- <md-button v-on:click="client.addPlayer" class="md-raised bg-clouds" >Suche Spiel...</md-button> -->
        <button type="button" v-on:click="client.addPlayer" class="md-button md-raised bg-clouds md-theme-default"> Suche Spiel...
          <div class="md-ink-ripple">
            <div class="md-ripple md-fadeout md-active" style="width: 131px; height: 131px; top: -58.5px; left: -33.5px;"></div>
          </div>
        </button>
      </md-layout>
    </md-layout>


  </md-layout>
</template>

<script>
import Client from './classes/Client.js'

const data = {
  client : new Client()
}

export default {
  name: 'app',
  data () {
    return data
  },
  methods : {
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
    }
  },
  computed: {
    reversedUsername() {
      return this.client.PlayerUser.split('').reverse().join('')
    }
  }
}
</script>

<style lang="scss">
  .lost {
    color: #E91E63 !important;
  }

  .won {
    color: #8BC34A !important;
  }

  #searchbox {
    margin: 50px auto auto auto;
    padding: 8px;

    & .md-card-content {
      padding: 8px;

      & .md-input-container {
        padding-top: 15px;
        margin-bottom: 10;
        height: 30px;
      }
    }
  }

</style>
