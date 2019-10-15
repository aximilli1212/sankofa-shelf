import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import { store } from './store/store'
import axios from 'axios'
import DateFilter from './filters/date'
import AlertCmp from './components/Shared/Alert.vue'
import 'mdi/css/materialdesignicons.css'



import VueChatScroll from 'vue-chat-scroll';

Vue.use(VueChatScroll)

Vue.use(Vuetify);
Vue.use(axios);

Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyCFYWd6FpR53u4hSPXQSjOYeZNPF1FxG2M',
      authDomain: 'yt-devmeetup.firebaseapp.com',
      databaseURL: 'https://yt-devmeetup.firebaseio.com',
      projectId: 'yt-devmeetup',
      storageBucket: ''
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    this.$store.dispatch('loadMeetups')
  }
})
