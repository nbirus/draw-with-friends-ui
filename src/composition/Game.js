import socket from '@/services/SocketService'
import { reactive } from 'vue'
import { userState } from '@/composition/User'
import { roomState } from '@/composition/Room'

export const gameState = reactive({
	timer: 0,
	event: 'loop_start',
	turn: {},
	roundWord: '',
})

export function sendGuess(guess) {
	if (guess) {
		socket.emit('guess', {
			userid: userState.userid,
			username: userState.username,
			roomid: roomState.roomid,
			guess,
		})
	}
}

// event handlers
function onTimer(timer) {
	gameState.timer = timer
}

function onRoundEvent(data) {
	gameState.event = data.event

	if (data.event === 'loop_start') {
		gameState.turn = data.turn
		gameState.roundWord = data.roundWord
	}
}

// events
socket.on('update_game_timer', onTimer)
socket.on('update_game_event', onRoundEvent)
