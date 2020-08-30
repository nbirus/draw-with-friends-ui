import {
	createStore
} from 'vuex'
import game from './game'
import Socket from '@/composition/Socket'

export default createStore({
	state() {
		return {
			// default id to session
			userid: sessionStorage.getItem('userid') || Math.random()
				.toString(16)
				.slice(2),
			username: sessionStorage.getItem('username'),
		}
	},
	getters: {
		userid: state => state.userid,
		username: state => state.username,
	},
	mutations: {
		SET_USER_ID(state, id) {
			state.userid = id
			sessionStorage.setItem('userid', id)
		},
		SET_USERNAME(state, username) {
			state.username = username
			sessionStorage.setItem('username', username)
		},
	},
	actions: {
		setUsername({
			commit
		}, username) {
			commit('SET_USERNAME', username)
			Socket.setPlayerUsername(username)
		},
		connect() {
			Socket.connect()
		},
	},
	modules: {
		game
	}
})