<script>
import GameHeader from './GameHeader'
import GameToolbar from './GameToolbar'
import GameOverlay from './GameOverlay'
import GameBoard from './GameBoard'
import GameTimer from './GameTimer'
import GameOverModal from './GameOverModal'

import { gameState, sendGuess } from '@/composition/Game'
import { roomState, joinRoom } from '@/composition/Room'
import { userState } from '@/composition/User'
import { ref, onMounted } from 'vue'
import router from '@/router'

export default {
	name: 'GamePage',
	components: { GameHeader, GameToolbar, GameOverlay, GameBoard, GameTimer, GameOverModal },
	setup() {
		let currentRoute = router.currentRoute.value
		let roomid = currentRoute.params.id
		onMounted(() => {
			joinRoom(roomid)
		})

		return {
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

		<div class="game__event" :class="`${gameState.turnUserColor} striped-${gameState.turnUserColor}`">
			<div
				v-if="gameState.event === 'round-start'"
			>Round {{gameState.round}}/{{gameState.roundEnd}} starting</div>
			<div v-if="gameState.event === 'round-end'">Round over</div>
			<div v-if="gameState.event === 'turn-pre'">
				<div
					v-if="gameState.turnUser.userid !== userState.userid"
				>{{gameState.turnUser.username}} is about to draw</div>
				<div v-else>You are about to draw, your word is: {{gameState.word}}</div>
			</div>
			<div v-if="gameState.event === 'turn-start'">{{gameState.turnUser.username}} is drawing</div>
			<div v-if="gameState.event === 'turn-end'">{{gameState.turnUser.username}}s turn is over</div>
		</div>

		<!-- timer -->
		<div class="game__timer">
			<game-timer />
		</div>

		<div class="game__main">
			<!-- board -->
			<game-board class="game__board card" />

			<!-- toolbar -->
			<game-toolbar class="game__toolbar" />
		</div>

		<!-- overlay -->

		<game-overlay class="game__overlay" v-if="gameState.event !== 'turn-start'" />
		<!-- <game-over-modal class="game__over-modal" :open="!gameState.started" /> -->
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
		padding: 1rem 0;
		display: flex;
		align-items: center;
		flex-direction: column;
		background-color: #fff;
		z-index: 2;
	}
	&__event {
		z-index: 1;
		font-size: 0.9rem;
		height: 36px;
		background-color: $light;
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 400;

		b {
			margin-right: 0.2rem;
			font-weight: 700;
		}

		@each $color, $name in $colors {
			&.#{$name} {
				// color: darken($color, 35);
			}
		}
	}
	&__timer {
		height: 50px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-items: center;
	}
	&__main {
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
		// background-color: fade-out(white, 0.25);
		display: flex;
		align-items: center;
		justify-content: center;
	}
}
</style>
