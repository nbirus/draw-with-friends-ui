import socket from '@/services/SocketService'
import { ref, reactive } from 'vue'
import { userState, setUserInfo } from '@/composition/User'

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
			username: userState.username,
			message,
		})
	}
}

// event handlers
function onConnect() {
	console.info('global:connceted')
	socketState.loading = false
	socketState.connected = true
	socketState.error = false

	// init current user info to server
	setUserInfo()
}

function onConnectError() {
	console.info('global:conncetion_error')
	socketState.loading = false
	socketState.connected = false
	socketState.error = true
	disconnect()
}

function onDisconnect() {
	console.info('global:disconnect')
	socketState.loading = false
	socketState.connected = false
	socketState.error = false
}

function onUsersUpdate(newUsers) {
	console.info('global:update-users')
	users.value = newUsers
}

function onRoomsUpdate(newRooms) {
	console.info('global:update-rooms')
	rooms.value = newRooms
}

function onGlobalMessage(newMessages) {
	console.info('global:update-messages')
	messages.value = newMessages
}

// events
socket.on('connect', onConnect)
socket.on('connect_error', onConnectError)
socket.on('disconnect', onDisconnect)
socket.on('update_users', onUsersUpdate)
socket.on('update_rooms', onRoomsUpdate)
socket.on('global_messages', onGlobalMessage)
