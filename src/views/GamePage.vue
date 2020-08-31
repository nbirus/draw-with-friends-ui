<template>
	<div class="page game">
		<div class="game__header">
			<ul class="game__header-users-left">
				<li
					v-for="user in usersListLeft"
					:key="user.userid"
					:class="{ active: gameState.turn === user.userid}"
				>
					<div class="username">{{user.username || 'Empty'}}</div>
					<div class="score">{{user.score || 0}}</div>
				</li>
			</ul>
			<div class="game__header-timer">{{gameState.timer || 0}}</div>
			<ul class="game__header-users-right">
				<li
					v-for="user in usersListRight"
					:key="user.userid"
					:class="{ active: gameState.turn === user.userid, match: true }"
				>
					<div class="score">{{user.score || 0}}</div>
					<div class="username">{{user.username || 'Empty'}}</div>
				</li>
			</ul>
		</div>

		<div class="game__body">
			<div class="game__board card">
				<board ref="board" />
				<div class="game__board-action-card card">
					<form @submit.prevent="guessSubmit">
						<input placeholder="Type to guess..." class="input input-medium" type="text" v-model="guess" />
						<button class="btn btn-primary btn-medium">Send</button>
					</form>
				</div>
			</div>
			<div class="game__overlay" v-if="overlay">
				<div class="game__overlay-card" v-if="gameState.event === 'loop_start'">
					<div>{{gameState.turn.username}}'s turn to draw</div>
				</div>
				<div class="game__overlay-card" v-else>ROUND OVER</div>
			</div>
		</div>
	</div>
</template>

<script>
import Board from '@/components/game/Board'
import { gameState, sendGuess } from '@/composition/Game'
import { roomState } from '@/composition/Room'
import { ref, watch } from 'vue'

export default {
	name: 'GamePage',
	components: { Board },
	methods: {
		reset() {
			this.$refs.board.reset()
		},
	},
	setup() {
		const overlay = ref(true)
		const guess = ref('')
		const usersList = ref(Object.values(roomState.room.users))
		const usersLength = Object.values(roomState.room.users).length

		for (var i = 0; i < 4 - usersLength; i++) {
			usersList.value.push({
				userid: 'empty',
			})
		}

		function guessSubmit() {
			sendGuess(guess.value)
			guess.value = ''
		}

		watch(
			() => gameState.event,
			event => {
				if (event === 'loop_start') {
					overlay.value = true
				} else if (event === 'round_start') {
					overlay.value = false
				} else if (event === 'round_end') {
					overlay.value = true
				}
			},
			{
				immediate: true,
			}
		)

		return {
			overlay,
			gameState,
			roomState,
			guess,
			guessSubmit,
			usersListLeft: usersList.value.slice(0, 2),
			usersListRight: usersList.value.slice(2, 4),
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
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		height: 64px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex: 0 0 auto;
		background-color: fade-out(white, 0.5);
		box-shadow: $box-shadow-toolbar;
		z-index: 2;

		&-users-left,
		&-users-right {
			display: flex;
			margin: 0;
			padding: 0;
			height: 100%;

			li {
				height: 100%;
				min-width: 200px;
				display: flex;
				align-items: center;

				.username {
					flex: 0 1 100%;
					padding: 0 2rem;
					font-size: 1.2rem;
					color: white;
				}
				.score {
					flex: 0 0 auto;
					font-size: 1.5rem;
					margin: 0;
					width: 50px;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					font-weight: 900;
				}

				&.active {
					background-color: fade-out($blue, 0.75);
				}
				&.match {
					background-color: darken($green, 5) !important;

					.score {
						background-color: lighten($green, 40);
						color: darken($green, 20);
					}
				}
			}
		}
		&-users-left {
			li {
				background-color: $primary;
				.score {
					background-color: lighten($primary, 40);
					color: darken($primary, 20);
				}
			}
		}
		&-users-right {
			li {
				background-color: $orange;
				.score {
					background-color: lighten($orange, 30);
					color: darken($orange, 30);
				}
			}
		}
		&-timer {
			flex: 0 0 auto;
			padding: 1rem 0 0;
			width: 90px;
			height: calc(100% + 0.25rem);

			box-shadow: $box-shadow;
			border-radius: $border-radius;

			background-color: white;
			display: flex;
			align-items: center;
			justify-content: center;
			font-weight: 900;
			font-size: 2.5rem;
		}
	}
	&__body {
		flex: 1 1 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	&__overlay {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background-color: fade-out(#fff, 0.5);
		z-index: 1;
		display: flex;
		align-items: center;
		justify-content: center;

		&-card {
			background-color: black;
			padding: 1rem;
			border-radius: $border-radius;
			color: white;
		}
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
		overflow: visible;

		&-action-card {
			position: absolute;
			bottom: -3em;
			width: auto;
			padding: 0.75rem;

			.input {
				width: 300px;
				margin-right: 0.5rem;
				border: none;
			}
		}
	}
}
</style>
