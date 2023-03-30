import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import state from './state';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

import moduleCart from './cart';
import moduleProduct from './product';

const localStorage = store => {
    
    store.subscribe((mutation, state) => {
        // console.log("subscribe : ",state);
        window.localStorage.setItem('cart', JSON.stringify(state.cart));
    })
}

const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state,
    getters,
    actions,
    mutations,
    modules: {
        cart: moduleCart,
        product: moduleProduct,
    },
    plugins:[localStorage]
});

export default store;