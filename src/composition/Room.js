import socket from '@/services/SocketService'
import { userState } from '@/composition/User'
import { reactive } from 'vue'
import router from '@/router'
import get from 'lodash/get'
const LOG = false

export const roomState = reactive({
	roomid: '',
	loading: false,
	error: false,
	connected: false,
	active: false,
	ready: false,
	gameOver: false,
	countDown: false,
	countDownTimer: 0,
	color: '',
	room: {},
	users: {},
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
	log('joining-room')
	roomState.roomid = roomid
	roomState.loading = true
	roomState.error = false
	roomState.connected = false
	roomState.room = {}
	socket.emit('join_room', roomid)
}
export function leaveRoom(roomid) {
	log('leaving-room')
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
			userid: userState.userid,
			message,
		})
	}
}
export function setReady(flag) {
	log('set-ready')
	roomState.ready = flag
	socket.emit('ready', flag)
}

export function setTyping(flag) {
	socket.emit('typing', flag)
}

export function setUserColor(color) {
	log('set-color')
	socket.emit('color', color)
}

// event handlers
function onJoinRoom(room) {
	log('join')
	roomState.loading = false
	roomState.error = false
	roomState.connected = true
	roomState.room = room
	roomState.users = room.users
}

function onUpdateRoom(room) {
	log('update', room.roomid)
	roomState.room = room
	roomState.users = room.users
	roomState.color = room.users[userState.userid].color
	let lastMessage = get(room, `messages.${room.messages.length - 1}`)
	if (lastMessage && ['countdown', 'countdown-cancel'].includes(lastMessage.event)) {
		roomState.countDown = lastMessage.event === 'countdown'
		roomState.countDownTimer = lastMessage.message
	}
}

function onJoinRoomError() {
	log('join-error')
	roomState.loading = false
	roomState.error = true
	roomState.connected = false
	roomState.room = {}
}

function onGameStart() {
	log('start')
	roomState.gameOver = false
	roomState.active = true
	router.push(`/${roomState.roomid}/game`)
}

function onGameOver() {
	log('end')
	roomState.active = false
	roomState.gameOver = true
}

// events
socket.on('join_room', onJoinRoom)
socket.on('update_room', onUpdateRoom)
socket.on('join_room_error', onJoinRoomError)
socket.on('game_start', onGameStart)
socket.on('game_over', onGameOver)

// helpers
function log(event) {
	if (LOG) {
		console.log(`room:${event}`)
	}
}

function uid() {
	return Math.random()
		.toString(16)
		.slice(11)
}
