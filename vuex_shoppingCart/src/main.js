import Vue from 'vue'
import App from './App.vue'

import store from './store'

//plugins: noti, bootstrap
import Notifications from 'vue-notification'
Vue.use(Notifications);

new Vue({
	el: '#app',
	store,
	render: h => h(App)
})
