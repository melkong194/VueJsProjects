import Vue from 'vue'
import Vuex from 'vuex'
import { v4 as uuidv4 } from 'uuid'
import database from '../config/database'
// import { auth, tasksRef, usersRef } from '../config/firebase'
// import { STATUS_CONFIG } from '../config/const';

import state from './state';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations
});

export default store;