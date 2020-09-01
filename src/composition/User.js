import socket from '@/services/SocketService'
import { reactive } from 'vue'
const LOG = false

// create state
export const userState = reactive({
	userid: sessionStorage.getItem('userid') || uid(),
	username: sessionStorage.getItem('username') || '',
	roomid: sessionStorage.getItem('roomid') || '',
})

// actions
export function setUserInfo() {
	log('set-user')
	socket.emit('set_user', userState)
	sessionStorage.setItem('userid', userState.userid)
	sessionStorage.setItem('username', userState.username)
}
export function setUsername(username) {
	log('set-name')
	userState.username = username
	socket.emit('set_user', {
		...userState,
		username,
	})
	sessionStorage.setItem('username', userState.username)
}

// helpers
function log(event) {
	if (LOG) {
		console.log(`user:${event}`)
	}
}
function uid() {
	return Math.random()
		.toString(16)
		.slice(10)
}
