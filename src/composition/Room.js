import socket from '@/services/SocketService'
import { userState } from '@/composition/User'
import { reactive } from 'vue'
import router from '@/router'

export const roomState = reactive({
	roomid: '',
	loading: false,
	error: false,
	connected: false,
	ready: false,
	room: {},
})

// actions
export function createRoom(room) {
	let roomid = uid(true)
	roomState.loading = true
	socket.emit('create_room', {
		roomid,
		userid: userState.userid,
		...room,
	})
	sessionStorage.setItem('roomid', roomid)
	router.push(`/${roomid}`)
}
export function joinRoom(roomid) {
	console.info('socket:joining-room')
	roomState.roomid = roomid
	roomState.loading = true
	roomState.error = false
	roomState.connected = false
	roomState.room = {}
	socket.emit('join_room', roomid)
}
export function leaveRoom(roomid) {
	console.info('socket:leaving-room')
	roomState.roomid = ''
	roomState.loading = false
	roomState.error = false
	roomState.connected = false
	roomState.room = {}
	socket.emit('leave_room', roomid)
}
export function roomMessage(message) {
	if (message) {
		socket.emit('room_message', {
			roomid: roomState.roomid,
			userid: userState.userid,
			username: userState.username,
			message,
		})
	}
}
export function setReady(flag) {
	roomState.ready = flag
	socket.emit('ready', flag)
}

// event handlers
function onJoinRoom(room) {
	console.log('room:join', room.roomid)
	roomState.loading = false
	roomState.error = false
	roomState.connected = true
	roomState.room = room
}

function onUpdateRoom(room) {
	console.log('room:update', room.roomid)
	roomState.room = room
}

function onJoinRoomError() {
	console.log('room:join-error')
	roomState.loading = false
	roomState.error = true
	roomState.connected = false
	roomState.room = {}
}

function onJoinReady() {
	console.log('room:ready')
	router.push(`/${roomState.roomid}/game`)
}

// events
socket.on('join_room', onJoinRoom)
socket.on('update_room', onUpdateRoom)
socket.on('join_room_error', onJoinRoomError)
socket.on('room_ready', onJoinReady)

// helpers
function uid() {
	return Math.random()
		.toString(16)
		.slice(11)
}
