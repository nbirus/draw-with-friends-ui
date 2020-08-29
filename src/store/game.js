import colors from './colors'

export default {
	namespaced: true,
	state() {
		return {
			rooms: {
				'test-1': {
					name: 'lobby 1',
					id: 'lobby-1',
					colors: ['blue', 'orange'],
					players: {
						'user1': {
							id: 'user1',
							username: 'username'
						},
						'user2': {
							id: 'user2',
							username: 'username 2'
						},
					}
				},
				'test-2': {
					name: 'lobby 1',
					id: 'lobby-1',
					colors: ['red', 'purple'],
					players: {
						'user1': {
							id: 'user1',
							username: 'username'
						},
						'user2': {
							id: 'user2',
							username: 'username 2'
						},
					}
				},
				'test-3': {
					name: 'lobby 1',
					id: 'lobby-1',
					colors: ['green', 'yellow'],
					players: {
						'user1': {
							id: 'user1',
							username: 'username'
						},
						'user2': {
							id: 'user2',
							username: 'username 2'
						},
					}
				},
				'test-4': {
					name: 'lobby 1',
					id: 'lobby-1',
					colors: ['blue', 'yellow'],

					players: {
						'user1': {
							id: 'user1',
							username: 'username'
						},
						'user2': {
							id: 'user2',
							username: 'username 2'
						},
					}
				},
				'test-5': {
					name: 'lobby 1',
					id: 'lobby-1',
					colors: ['blue', 'yellow'],

					players: {
						'user1': {
							id: 'user1',
							username: 'username'
						},
						'user2': {
							id: 'user2',
							username: 'username 2'
						},
					}
				},
			},
			players: {
				'id': {
					username: 'test'
				},
				'id2': {
					username: 'test 2'
				},
			},
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
	},
	actions: {
		setRooms({
			commit
		}, rooms) {
			commit('SET_ROOMS', rooms)
		},
	},
}