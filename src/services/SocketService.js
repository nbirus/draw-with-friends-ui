import io from 'socket.io-client'
import {
	reactive,
	ref
} from 'vue'
import router from '@/router'

export const socket = io.connect(process.env.VUE_APP_URL, {
	autoConnect: false,
})
export const userState = reactive({
	userid: sessionStorage.getItem('userid') || uid(),
	username: sessionStorage.getItem('username') || '',
	roomid: sessionStorage.getItem('roomid') || '',
})
export const socketState = reactive({
	loading: false,
	connected: false,
	error: false,
})
export const roomState = reactive({
	roomid: '',
	loading: false,
	error: false,
	connected: false,
	room: {},
})
export const users = ref({})
export const rooms = ref({})
export const messages = ref([])


// actions
export function connect() {
	socketState.loading = true
	socket.connect()
}
export function disconnect() {
	socket.disconnect()
}
export function setUserInfo() {
	socket.emit('set_user', userState)
	sessionStorage.setItem('userid', userState.userid)
	sessionStorage.setItem('username', userState.username)
}
export function setUsername(username) {
	userState.username = username
	socket.emit('set_user', {
		...userState,
		username,
	})
	sessionStorage.setItem('username', userState.username)
}
export function createRoom(room) {
	let roomid = uid(true)
	roomState.loading = true
	socket.emit('create_room', {
		roomid,
		userid: userState.userid,
		...room,
	})
	userState.roomid = roomid
	sessionStorage.setItem('roomid', userState.roomid)
	router.push(`/${roomid}/room`)
}
export function joinRoom(roomid) {
	roomState.roomid = roomid
	roomState.loading = true
	roomState.error = false
	roomState.connected = false
	roomState.room = {}
	socket.emit('join_room', roomid)
}
export function globalMessage(message) {
	if (message) {
		socket.emit('global_message', {
			userid: userState.userid,
			username: userState.username,
			message,
		})
	}
}



// events
function onConnect() {
	console.info('socket:connected');
	socketState.loading = false
	socketState.connected = true
	socketState.error = false

	// init current user info to server
	setUserInfo()
}

function onConnectError() {
	console.error('socket:connect_error');
	socketState.loading = false
	socketState.connected = false
	socketState.error = true
	disconnect()
}

function onDisconnect() {
	console.info('socket:disconnect');
	socketState.loading = false
	socketState.connected = false
	socketState.error = false
	socket.emit('removePlayer', userState.userid)
}

function onUsersUpdate(newUsers) {
	users.value = newUsers
}

function onRoomsUpdate(newRooms) {
	console.info('socket:rooms-update');
	rooms.value = newRooms
}

function onGlobalMessage(newMessages) {
	messages.value = newMessages
}

function onJoinRoom(room) {
	console.log('socket:join', room.roomid);
	roomState.loading = false
	roomState.error = false
	roomState.connected = true
	roomState.room = room
}

function onJoinRoomError() {
	console.log('socket:join-error');
	roomState.loading = false
	roomState.error = true
	roomState.connected = false
	roomState.room = {}
}


// bind socket events
socket.on('connect', onConnect)
socket.on('connect_error', onConnectError)
socket.on('disconnect', onDisconnect)
socket.on('update_users', onUsersUpdate)
socket.on('update_rooms', onRoomsUpdate)
socket.on('join_room', onJoinRoom)
socket.on('join_room_error', onJoinRoomError)
socket.on('global_messages', onGlobalMessage)

// helpers
function uid(small = false) {
	return Math.random()
		.toString(16)
		.slice(small ? 11 : 2)
}