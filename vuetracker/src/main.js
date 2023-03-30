import Vue from 'vue'
import App from './App.vue'
import './plugin'
import store from './store'
import router from './router'
import { auth, userRef } from './config/database';
import Datetime from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'
Vue.use(Datetime)

auth.onAuthStateChanged(function (user) {
	if(user){
		userRef.child(user.uid).once('value',function(snapshot){
			if((snapshot.toJSON().role==snapshot.toJSON().checkRole)){
				let data = { email: user.email, uid: user.uid }
				store.commit('SET_CURRENT_USER', data);
				store.commit('SET_USER_ROLE', snapshot.toJSON().role);
				if(snapshot.toJSON().role == 1)
					router.push({path:"/staff"}).catch(() => {});
				else
					router.push({path:"/admin"}).catch(() => {});
			}else{
				let data = { email: '', uid: '' }
				store.commit('SET_CURRENT_USER', data);
				store.commit('SET_USER_ROLE', 0);
				router.push({path:"/login"}).catch(() => {});
			}
		})
	}else{
		let data = { email: '', uid: '' }
		store.commit('SET_CURRENT_USER', data);
		store.commit('SET_USER_ROLE', 0);
		router.push({path:"/login"}).catch(() => {});
	}
	
});

new Vue({
	el: '#app',
	store,
	router,
	render: h => h(App)
})
