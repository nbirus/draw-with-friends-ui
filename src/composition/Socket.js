import io from 'socket.io-client'
import {
	reactive,
} from 'vue'
import store from '@/store'

// setup
export let socket = io.connect(process.env.VUE_APP_URL, {
	autoConnect: false,
})

// create state
let socketState = reactive({
	loading: false,
	connected: false,
	error: false,
	inRoom: false,
	activeRoom: {},
	players: [],
	rooms: {},
})


// events
socket.on('connect', () => {
	socketState.loading = false
	socketState.connected = socket.connected
	console.log('Connected');

	// actions
	setPlayer()
	getPlayers()
	getRooms()
})
socket.on('connect_error', () => {
	socketState.loading = false
	socketState.error = true
})
socket.on('disconnect', () => {
	socketState.connected = false
	console.log('You have disconnected to the server');
})
socket.on('players', players => {
	store.dispatch('game/setPlayers', players)
})
socket.on('rooms', rooms => {
	socketState.rooms = rooms
})
socket.on('joined-room', room => {
	console.log('You have connected to room ', room);
})

// connection methods
function connect() {
	socketState.loading = true
	socket.connect()
}

function disconnect() {
	socket.emit('removePlayer', store.getters['userid'])
	socket.disconnect()
}

// player methods
function setPlayer() {
	socket.emit('setPlayer', {
		userid: store.getters['userid'],
		username: store.getters['username'],
	})
}

function setPlayerUsername(username) {
	socket.emit('setPlayer', {
		username,
		userid: store.getters['userid'],
	})
}

function getPlayers() {
	socket.emit('getPlayers')
}

// room methods
function createRoom(e) {
	socket.emit('createRoom', {
		roomId: store.getters['userid'],
		name: e.target[0].value,
		userid: store.getters['userid'],
		username: store.getters['username'],
	})
	// joinRoom(store.getters['userid'])
}

function joinRoom(room) {
	socket.emit('joinRoom', {
		roomId: room.id,
		userid: store.getters['userid'],
		username: store.getters['username'],
	})
}

function getRooms() {
	socket.emit('getRooms')
}

export default {
	socket,
	socketState,
	connect,
	disconnect,
	setPlayerUsername,
	createRoom,
	joinRoom,
}


// remove yourself from the server if you leave
window.addEventListener('beforeunload', function () {
	disconnect()
});