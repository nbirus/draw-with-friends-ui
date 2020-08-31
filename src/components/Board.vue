<template>
	<div class="board">
		<div id="cursors"></div>
		<canvas
			@mousedown="canvasMouseDown"
			@mouseup="canvasMouseUp"
			@mousemove="canvasMouseMove"
			id="canvas"
			height="600"
			width="800"
		>Your browser needs to support canvas for this to work!</canvas>
	</div>
</template>

<script>
import { onMounted } from 'vue'
import {
	socket,
	userState,
	roomState,
} from '@/services/SocketService'
import store from '@/store'

export default {
	name: 'board',
	setup() {
		let canvas
		let ctx
		let id = store.getters['userid']
		let username = store.getters['username']
		let drawing = false
		let clients = {}
		let cursors = {}
		let prev = {}
		let lastEmit = Date.now()

		onMounted(() => {
			canvas = document.getElementById('canvas')
			ctx = canvas.getContext('2d')
		})

		// Remove inactive clients after 3 minutes of inactivity
		// setInterval(function() {
		// 	for (let ident in clients) {
		// 		if (Date.now() - clients[ident].updated > 10000) {
		// 			cursors[ident].remove()
		// 			delete clients[ident]
		// 			delete cursors[ident]
		// 		}
		// 	}
		// }, 10000)

		// deal with server move
		socket.on('moving', function(data) {
			// if (!(data.id in clients)) {
			// a new user has come online. create a cursor for them
			// let newCursor = document.createElement('div').classList.add('cursor')
			// cursorsElement.appendChild(newCursor)
			// cursors[data.id] = newCursor
			// }
			// Move the mouse pointer
			// cursors[data.id].css({
			// 	left: data.x,
			// 	top: data.y,
			// })

			// Draw other user's shape
			if (data.drawing && data.userid !== userState.userid) {
				drawLine(
					clients[data.id].x,
					clients[data.id].y,
					data.x,
					data.y
				)
			}

			// Saving the current client state
			clients[data.id] = data
			clients[data.id].updated = Date.now()
		})

		// canvas events
		function canvasMouseDown(e) {
			e.preventDefault()
			drawing = true
			prev.x = e.offsetX
			prev.y = e.offsetY
		}
		function canvasMouseUp(e) {
			e.preventDefault()
			drawing = false
		}
		function canvasMouseMove(e) {
			if (Date.now() - lastEmit > 30) {
				socket.emit('mousemove', {
					x: e.offsetX,
					y: e.offsetY,
					drawing: drawing,
					username: userState.username,
					userid: userState.userid,
					roomid: roomState.roomid,
				})
				lastEmit = Date.now()
			}
			if (drawing) {
				drawLine(prev.x, prev.y, e.offsetX, e.offsetY)
				prev.x = e.offsetX
				prev.y = e.offsetY
			}
		}

		// helpers
		function drawLine(fromx, fromy, tox, toy) {
			ctx.moveTo(fromx, fromy)
			ctx.lineTo(tox, toy)
			ctx.stroke()
		}

		// methods
		function reset() {
			ctx.clearRect(0, 0, canvas.width, canvas.height)
			ctx.beginPath()
			var w = canvas.width
			ctx.width = 1
			ctx.width = w
		}

		return {
			reset,
			canvasMouseDown,
			canvasMouseUp,
			canvasMouseMove,
		}
	},
}
</script>

<style scoped>
.board {
	width: auto;
	height: auto;
}
#canvas {
	height: 600px;
	width: 800px;
}
</style>
