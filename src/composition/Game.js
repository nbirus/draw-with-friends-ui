import socket from '@/services/SocketService'
import { reactive } from 'vue'
import { userState } from '@/composition/User'
import { roomState } from '@/composition/Room'
const LOG = true

export const gameState = reactive({
	timer: 0,
	event: '',
	roundWord: '',
	turnIndex: 1,
	round: 1,
	numberOfRounds: 5,
	numberOfTurns: 4,
	roundTimer: 10,
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

function onGameEvent(data) {
	log(data.event)
	gameState.event = data.event
	gameState.event = data.event || gameState.event
	gameState.turnIndex = data.turnIndex || gameState.turnIndex
	gameState.round = data.round || gameState.round
	gameState.roundWord = data.roundWord || gameState.roundWord
	gameState.numberOfRounds =
		data.numberOfRounds || gameState.numberOfRounds
	gameState.numberOfTurns =
		data.numberOfTurns || gameState.numberOfTurns
	gameState.roundTimer = data.roundTimer || gameState.roundTimer
}

// events
socket.on('update_game_timer', onTimer)
socket.on('update_game_event', onGameEvent)

// helpers
function log(event) {
	if (LOG) {
		console.log(`game:${event}`)
	}
}
