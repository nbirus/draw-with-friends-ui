export default {
	namespaced: true,
	state() {
		return {
			rooms: {
				'test-1': {
					name: 'lobby 1',
					id: 'lobby-1',
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
			players: {},
		}
	},
	getters: {
		rooms: state => state.rooms,
		players: state => state.players,
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