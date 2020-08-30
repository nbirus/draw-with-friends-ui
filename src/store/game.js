import colors from './colors'

export default {
	namespaced: true,
	state() {
		return {
			rooms: {},
			players: {},
			colors: colors,
		}
	},
	getters: {
		colors: state => state.colors,
		rooms: state => state.rooms,
		players: state => state.players,
		playersLength: state => Object.keys(state.players).length,
	},
	mutations: {
		SET_ROOMS(state, rooms) {
			state.rooms = rooms
		},
		ADD_ROOM(state, {
			id,
			name
		}) {
			state.rooms[id] = {
				name,
				id,
				colors: ['blue', 'orange'],
				players: {
					'user1': {
						id: 'user1',
						username: 'username'
					}
				}
			}
		},
		SET_PLAYERS(state, players) {
			state.players = players
		},
		ADD_PLAYER(state, player) {
			state.players[player.userid] = player
		}
	},
	actions: {

		addPlayeR({
			commit
		}, player) {
			commit('ADD_PLAYER', player)
		},

		createRoom({
			commit
		}, payload) {
			commit('ADD_ROOM', payload)
		},

		setRooms({
			commit
		}, rooms) {
			commit('SET_ROOMS', rooms)
		},
		setPlayers({
			commit
		}, players) {
			commit('SET_PLAYERS', players)
		},
	},
}