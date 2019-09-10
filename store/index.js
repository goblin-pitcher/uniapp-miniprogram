import Vue from 'vue'
import Vuex from 'vuex'
import storage from './persistent.js'
import {state, mutations} from './store.js'

Vue.use(Vuex)
export default new Vuex.Store({
	state,
	mutations,
	modules:{
		storage
	}
})