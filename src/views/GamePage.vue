<template>
	<div class="page game">
		<!-- <div class="game__header">
			<router-link to="/">Leave Game</router-link>
			<button @click="reset">Clear Drawing</button>
		</div>-->
		<div class="game__body">
			<div class="game__scoreboard">
				<!-- <div class="game__nameplate team-1">
					<div class="game__nameplate-team">Team One</div>
					<div class="game__nameplate-score">2</div>
				</div>-->
				<div class="game__timer">{{gameState.timer}}</div>
				<div class="game__timer">{{gameState.event}}</div>
				<div class="game__timer">{{gameState.turn}}</div>
				<div class="game__timer">{{gameState.roundWord}}</div>
				<!-- <div class="game__nameplate team-2">
					<div class="game__nameplate-score">5</div>
					<div class="game__nameplate-team">Team Two</div>
				</div>-->
			</div>

			<form class="mb-10" @submit.prevent="guessSubmit">
				<input class="input" type="text" v-model="guess" />
			</form>
			{{roomState.room.users}}
			<div class="game__board card" v-if="false">
				<board ref="board" />
			</div>
		</div>
	</div>
</template>

<script>
import Board from '@/components/Board'
import {
	gameState,
	roomState,
	sendGuessMessage,
} from '@/services/SocketService'
import { ref } from 'vue'

export default {
	name: 'GamePage',
	components: { Board },
	methods: {
		reset() {
			this.$refs.board.reset()
		},
	},
	setup() {
		let guess = ref('')

		function guessSubmit() {
			sendGuessMessage(guess.value)
			guess.value = ''
		}

		return {
			gameState,
			roomState,
			guess,
			guessSubmit,
		}
	},
}
</script>

<style lang="scss">
@import '@/styles/variables.scss';

.game {
	display: flex;
	flex-direction: column;

	&__header {
		flex: 0 0 auto;
		padding: 1rem;

		a,
		button {
			background-color: transparent;
			padding: none;
			color: $text;
			text-decoration: underline;
			opacity: 0.75;
			font-size: 0.9rem;
		}
	}
	&__body {
		flex: 1 1 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	&__scoreboard {
		flex: 0 0 auto;
		margin-bottom: 2rem;
		display: flex;
		min-width: 550px;
	}
	&__nameplate {
		background-color: white;
		border-radius: $border-radius;
		flex: 1;
		width: auto;
		overflow: hidden;
		box-shadow: $box-shadow;

		display: flex;

		&-score {
			flex: 0 0 auto;
			padding: 0.75rem 1.15rem;
			background-color: lighten($primary, 45);
			color: darken($primary, 30);
			font-size: 1.5rem;
			display: flex;
			align-items: center;
			justify-content: center;
			font-weight: 900;
		}
		&-team {
			flex: 0 1 100%;
			padding: 1rem 1.5rem;
			color: white;
			font-size: 1.2rem;
			background-color: $primary;
		}
	}
	&__timer {
		flex: 0 0 auto;
		padding: 0.75rem 1rem;
		border-radius: $border-radius;
		background-color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 900;
		font-size: 1.25rem;
		margin: 0 1rem;
	}
	&__board {
		flex: 0 1 100%;
		position: relative;
		height: auto;
		width: auto;
	}
}
</style>
