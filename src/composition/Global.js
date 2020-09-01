import socket from '@/services/SocketService'
import { ref, reactive } from 'vue'
import { userState, setUserInfo } from '@/composition/User'
const LOG = false

export const socketState = reactive({
	loading: false,
	connected: false,
	error: false,
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
export function globalMessage(message) {
	if (message) {
		socket.emit('global_message', {
			userid: userState.userid,
			message,
		})
	}
}

// event handlers
function onConnect() {
	log('connceted')
	socketState.loading = false
	socketState.connected = true
	socketState.error = false

	// init current user info to server
	setUserInfo()
}

function onConnectError() {
	log('conncetion_error')
	socketState.loading = false
	socketState.connected = false
	socketState.error = true
	disconnect()
}

function onDisconnect() {
	log('disconnect')
	socketState.loading = false
	socketState.connected = false
	socketState.error = false
}

function onUsersUpdate(newUsers) {
	log('update-users')
	users.value = newUsers
}

function onRoomsUpdate(newRooms) {
	log('update-rooms')
	rooms.value = newRooms
}

function onGlobalMessage(newMessages) {
	log('update-messages')
	messages.value = newMessages
}

// events
socket.on('connect', onConnect)
socket.on('connect_error', onConnectError)
socket.on('disconnect', onDisconnect)
socket.on('update_users', onUsersUpdate)
socket.on('update_rooms', onRoomsUpdate)
socket.on('global_messages', onGlobalMessage)

// helpers
function log(event) {
	if (LOG) {
		console.log(`global:${event}`)
	}
}
