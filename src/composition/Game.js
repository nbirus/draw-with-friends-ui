import socket from '@/services/SocketService'
import {
	reactive
} from 'vue'
import {
	userState
} from '@/composition/User'
import {
	roomState
} from '@/composition/Room'
const LOG = true

export const gameState = reactive({
	event: '',
	timer: 0,
	word: '',
	color: '',
	round: 1,
	roundEnd: 5,
	turn: 1,
	turnEnd: 2,
	turnUser: {},
	drawing: false,
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

function onUpdateGame(data) {
	log(data.event)
	Object.keys(gameState).forEach(key => {
		if (data[key] !== undefined) {
			gameState[key] = data[key]
		}
	})
	gameState.drawing = userState.userid === gameState.turnUser.userid && data.event === 'turn-start'
}


// events
socket.on('update_game', onUpdateGame)
socket.on('update_game_timer', onTimer)

// helpers
function log(event) {
	if (LOG) {
		console.log(`game:${event}`)
	}
}