import io from 'socket.io-client'
import { reactive } from 'vue'
import store from '@/store'

// setup
export let socket = io.connect(process.env.VUE_APP_URL, {
	autoConnect: false,
})
let socketState = reactive({
	loading: false,
	connected: false,
	error: false,
	players: [],
})

// events
socket.on('connect', () => {
	socketState.loading = false
	socketState.connected = socket.connected
})
socket.on('connect_error', () => {
	socketState.loading = false
	socketState.error = true
})
socket.on('disconnect', () => {
	socketState.connected = false
})
socket.on('lobby', data => {
	socketState.players = data
})

// methods
function connect(e) {
	store.dispatch('setUserid')
	store.dispatch('setUsername', e.target[0].value)
	socketState.loading = true
	socket.connect()

	socket.emit('join', {
		id: store.getters['userid'],
		username: store.getters['username'],
	})
}
function disconnect() {
	socket.shutdown()
}

export default {
	socket,
	socketState,
	connect,
	disconnect,
}
