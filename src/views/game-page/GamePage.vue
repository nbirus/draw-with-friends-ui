<script>
import GameHeader from './GameHeader'
import GameToolbar from './GameToolbar'
import GameOverlay from './GameOverlay'
import GameBoard from './GameBoard'
import GameTimer from './GameTimer'

// import Board from '@/components/game/Board'

import { gameState, sendGuess } from '@/composition/Game'
import { roomState, joinRoom } from '@/composition/Room'
import { userState } from '@/composition/User'
import { ref, onMounted } from 'vue'
import router from '@/router'

export default {
	name: 'GamePage',
	components: { GameHeader, GameToolbar, GameOverlay, GameBoard, GameTimer },
	setup() {
		const guess = ref('')
		function guessSubmit() {
			sendGuess(guess.value)
			guess.value = ''
		}

		let currentRoute = router.currentRoute.value
		let roomid = currentRoute.params.id
		onMounted(() => {
			joinRoom(roomid)
		})

		return {
			guess,
			guessSubmit,
			sendGuess,
			gameState,
			roomState,
			userState,
		}
	},
}
</script>

<template>
	<div class="page game">
		<!-- header -->
		<game-header class="game__header" />

		<!-- timer -->
		<game-timer class="game__timer" />

		<div class="game__main">
			<!-- board -->
			<game-board class="game__board" />

			<!-- toolbar -->
			<game-toolbar class="game__toolbar" />
		</div>

		<!-- overlay -->
		<game-overlay class="game__overlay" v-if="gameState.event !== 'turn-start'" />
	</div>
</template>

<style lang="scss">
@import '@/styles/variables.scss';
.game {
	&__debug {
		position: fixed;
		top: 2rem;
		height: 1000px;
		z-index: 999;
	}
	&__actions {
		padding: 1rem;
		position: fixed;
		bottom: 0;
	}
	&__header {
		padding: 2rem;
		display: flex;
		align-items: center;
		flex-direction: column;
	}
	&__main {
		padding: 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		position: relative;
	}
	&__board {
		width: auto;
		height: auto;
		display: flex;
	}
	&__toolbar {
		position: absolute;
		bottom: -1rem;
		width: 450px;
		height: 74px;
		margin: 0 auto;
	}
	&__overlay {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: fade-out(white, 0.25);
		display: flex;
		align-items: center;
		justify-content: center;
	}
}
</style>
