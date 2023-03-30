import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		count: 10,
		value: 1000,
		value2: 3000
	},
	getters:{
		count: state => {
			return state.count;
		},
		value: state => {
			return state.value
		},
		countDouble: state => {
			return state.count * 2;
		}
	},
	mutations:{//call by commit
		increment(state, number){
			state.count+number;
		},
		decrement(state, number){
			state.count- number;
		}
	},
	actions:{
		incrementAction ({ commit, dispatch }, obj) {
			// 1 action -> gọi đến 1 mutations
			console.log("Action: increment", obj);
			dispatch('testABC');
			commit('increment', obj.number)
		},
		decrementAction ({ commit }, obj) {
			console.log("Action: decrement", obj);
			commit('decrement', obj.number)
		},
		testABC (context) {
			console.log("testABC");
		}
	}
})

new Vue({
	el: '#app',
	store,
	render: h => h(App)
})
