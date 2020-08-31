import socket from '@/services/SocketService'
import { reactive } from 'vue'

// create state
export const userState = reactive({
	userid: sessionStorage.getItem('userid') || uid(),
	username: sessionStorage.getItem('username') || '',
	roomid: sessionStorage.getItem('roomid') || '',
})

// actions
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

// helpers
function uid() {
	return Math.random()
		.toString(16)
		.slice(2)
}
