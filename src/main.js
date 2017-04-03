import Vue from 'vue';
import App from './App.vue';
import VueMaterial from 'vue-material';



Vue.use(VueMaterial);

Vue.material.registerTheme('default', {
  primary: {
    color: 'indigo',
    hue: '500'
  }, // alternative Schreibweise
  accent: 'blue-grey',
  warn: 'red'
});

window.vue = new Vue({
  el: '#app',
  render: h => h(App)
});
