<template>
	<div class="home">
		<div id="cursors">
			<!-- The mouse pointers will be created here -->
		</div>

		<canvas id="canvas" width="1900" height="1000">
			Your browser needs to support canvas for this to work!
		</canvas>
	</div>
</template>

<script>
const url = process.env.VUE_APP_URL
import io from 'socket.io-client'
const socket = io.connect(url)

import { onMounted } from 'vue'

export default {
	name: 'Home',
	setup() {
		onMounted(() => {
			let doc = document
			let canvas = document.getElementById('canvas')
			let ctx = canvas.getContext('2d')

			// Generate an unique ID
			let id = getId()
			let drawing = false
			let clients = {}
			let cursors = {}
			let prev = {}

			// recive move from server
			socket.on('moving', function(data) {
				if (!(data.id in clients)) {
					// a new user has come online. create a cursor for them
					// let newCursor = document.createElement('div').classList.add('cursor')
					// cursorsElement.appendChild(newCursor)
					// cursors[data.id] = newCursor
				}

				// Move the mouse pointer
				// cursors[data.id].css({
				// 	left: data.x,
				// 	top: data.y,
				// })

				// Is the user drawing?
				if (data.drawing && clients[data.id]) {
					// Draw a line on the canvas. clients[data.id] holds
					// the previous position of this user's mouse pointer

					drawLine(clients[data.id].x, clients[data.id].y, data.x, data.y)
				}

				// Saving the current client state
				clients[data.id] = data
				clients[data.id].updated = Date.now()
			})

			// on canvas draw
			canvas.addEventListener('mousedown', function(e) {
				e.preventDefault()
				drawing = true
				prev.x = e.pageX
				prev.y = e.pageY
			})
			canvas.addEventListener('mouseup', function(e) {
				e.preventDefault()
				drawing = false
			})

			let lastEmit = Date.now()

			// brodcast all moves
			doc.addEventListener('mousemove', function(e) {
				if (Date.now() - lastEmit > 30) {
					socket.emit('mousemove', {
						x: e.pageX,
						y: e.pageY,
						drawing: drawing,
						id: id,
					})
					lastEmit = Date.now()
				}
				if (drawing) {
					drawLine(prev.x, prev.y, e.pageX, e.pageY)
					prev.x = e.pageX
					prev.y = e.pageY
				}
			})

			// Remove inactive clients after 3 minutes of inactivity
			setInterval(function() {
				for (let ident in clients) {
					if (Date.now() - clients[ident].updated > 60000 * 3) {
						// Last update was more than 10 seconds ago.
						// This user has probably closed the page

						cursors[ident].remove()
						delete clients[ident]
						delete cursors[ident]
					}
				}
			}, 60000 * 3)

			function drawLine(fromx, fromy, tox, toy) {
				ctx.moveTo(fromx, fromy)
				ctx.lineTo(tox, toy)
				ctx.stroke()
			}
		})

		return
	},
}

function getId() {
	return Math.random()
		.toString(16)
		.slice(2)
}
</script>
