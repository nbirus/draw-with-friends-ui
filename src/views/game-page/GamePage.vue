<template>
	<div class="page game">
		<!-- debug info -->
		<div class="game__debug" v-if="showDebug">
			<div class="card">
				<pre>{{ gameState }}</pre>
			</div>
			<div class="card">
				<pre>{{ roomState.room.users }}</pre>
			</div>
		</div>

		<!-- actions -->
		<div class="game__actions">
			<a href="#" @click.prevent="showDebug=!showDebug">Debug</a>
		</div>

		<!-- header -->
		<div class="game__header">
			<ul class="game__users">
				<li
					class="game__user"
					v-for="(user, userid) in roomState.room.users"
					:key="userid"
					:class="[{ match: user.match, turn: gameState.turnUser.userid === userid }, `striped-${user.color}`]"
				>
					<div class="game__user-username" v-text="user.username"></div>
					<div class="game__user-score">
						<i class="ri-pencil-fill" v-if="gameState.turnUser.userid === userid"></i>
						<span v-else v-text="user.score"></span>
					</div>
				</li>
			</ul>
			<div class="game__rounds">{{gameState.round}}/{{gameState.roundEnd}}</div>
		</div>

		<!-- main container -->
		<div class="game__main">
			<div
				class="game__board-timer"
				v-if="['turn-pre', 'turn-start'].includes(gameState.event)"
				:class="roomState.room.users[gameState.turnUser.userid].color"
			>
				<i class="ri-timer-fill"></i>
				<div
					class="bar"
					:class="[{'transition-width': gameState.event === 'turn-start'}, `striped-${roomState.room.users[gameState.turnUser.userid].color}`]"
				></div>
			</div>
			<div class="game__board card">
				<div class="game__board-event">
					<span
						v-if="gameState.event === 'round-start'"
					>Round {{gameState.round}}/{{gameState.roundEnd}} starting</span>
					<span v-if="gameState.event === 'round-end'">Round over</span>
					<span v-if="gameState.event === 'turn-pre'">{{gameState.turnUser.username}} is about to draw</span>
					<span v-if="gameState.event === 'turn-start'">{{gameState.turnUser.username}} is drawing</span>
					<span v-if="gameState.event === 'turn-end'">{{gameState.turnUser.username}} turn is over</span>
				</div>
				<board />
			</div>

			<!-- show toolbar if turn is active -->
			<div class="game__toolbar card" v-if="gameState.event === 'turn-start'">
				<form class="game__toolbar-form" @submit.prevent="guessSubmit" v-if="!gameState.drawing">
					<input
						placeholder="Type to guess..."
						class="input input-medium mr-2"
						type="text"
						v-model="guess"
					/>
					<button class="btn btn-primary btn-medium">Send</button>
				</form>
				<div class="game__toolbar-drawkit" v-else>
					<span>{{gameState.word}}</span>
				</div>
			</div>
		</div>

		<!-- overlay -->
		<div class="game__overlay" v-if="gameState.event !== 'turn-start'">
			<div class="game__overlay-card card">
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
		</div>
	</div>
</template>

<script>
import Board from '@/components/game/Board'
import { gameState, sendGuess } from '@/composition/Game'
import { roomState, joinRoom } from '@/composition/Room'
import { userState } from '@/composition/User'
import { ref, onMounted } from 'vue'
import router from '@/router'

export default {
	name: 'GamePage',
	components: { Board },
	setup() {
		const guess = ref('')
		const showDebug = ref(false)
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
			showDebug,
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
	&__rounds {
		font-size: 0.9rem;
		color: $text-light;
		border-radius: $border-radius;
		position: absolute;
		right: 2rem;
		top: 2rem;
	}
	&__users {
		padding: 0;
		margin: 0;
		display: flex;
		align-items: center;
	}
	&__user {
		color: white;
		display: flex;
		align-items: center;
		margin-right: 1rem;
		border-radius: $border-radius;
		border: solid thin $border-color-light;
		transition: all 0.2s ease;

		&.match {
			background-color: $green;
		}
		&.turn {
			transform: scale(1.025) translateY(-2px);
			box-shadow: $box-shadow;
		}

		&-username {
			padding: 1rem;
			min-width: 120px;
			font-size: 1.05rem;
		}
		&-score {
			padding: 1.25rem;
			font-size: 1.2rem;
			font-weight: 900;
			background-color: fade-out($text, 0.8);
		}
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

		&-timer {
			position: relative;
			width: calc(800px - 1rem);
			height: 24px;
			border-radius: 1rem;

			background-color: lighten($grey, 20);
			margin-bottom: 1.5rem;

			i {
				display: flex;
				align-items: center;
				justify-content: center;
				color: lighten($text, 10);
				font-size: 1.5rem;
				background-color: lighten($grey, 20);
				width: 2.75rem;
				height: 2.75rem;
				border-radius: 50%;
				position: absolute;
				top: -0.65rem;
			}

			.bar {
				position: absolute;
				left: 2.75rem;
				top: 6px;
				bottom: 6px;
				width: calc(100% - 2.75rem - 6px);
				border-radius: 1rem;
				background-color: lighten($grey, 0);
				transition: width 10s;
			}

			@each $color, $name in $colors {
				&.#{$name} {
					background-color: lighten($color, 40);

					i {
						color: darken($color, 30);
						background-color: lighten($color, 40);
					}
				}
			}
		}
		&-event {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0.5rem 0;
			background-color: transparent;
			color: white;
			font-weight: 900;
			display: none;
		}
	}
	&__toolbar {
		position: absolute;
		bottom: -1rem;
		width: 450px;
		height: 74px;
		margin: 0 auto;

		&-form {
			padding: 0.75rem;
			display: flex;

			.input {
				flex: 0 1 100%;
				border: none;
			}
		}
		&-drawkit {
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 1.5rem;
		}
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

		&-card {
			display: flex;
			align-items: center;
			justify-content: center;
			width: auto;
			padding: 1rem 3rem;
			font-size: 1.5rem;
			font-weight: 900;
		}
	}
}

.transition-width {
	width: 0px !important;
}
</style>
