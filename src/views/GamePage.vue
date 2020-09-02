<template>
	<div class="page game">
		<div class="debug">
			<div class="card">
				<pre>{{ gameState }}</pre>
			</div>
			<div class="card">
				<pre>{{ roomState.room.users }}</pre>
			</div>
		</div>
		<div class="main">
			<form @submit.prevent="guessSubmit">
				<input
					:disabled="gameState.event !== 'turn-start' || gameState.drawing"
					placeholder="Type to guess..."
					class="input input-medium mr-2"
					type="text"
					v-model="guess"
				/>
				<button class="btn btn-primary btn-medium">Send</button>
			</form>

			<ul>
				<li v-for="(user, userid, i) in roomState.room.users" :key="i">
					<span class="mr-2">{{user.username}}</span>
					<span class="mr-2">match: {{user.match}}</span>
					<span>drawing: {{user.userid === gameState.turnUser.userid}}</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { gameState, sendGuess } from '@/composition/Game'
import { roomState } from '@/composition/Room'
import { ref } from 'vue'

export default {
	name: 'GamePage',
	setup() {
		const guess = ref('')

		function guessSubmit() {
			sendGuess(guess.value)
			guess.value = ''
		}

		return {
			guess,
			guessSubmit,
			sendGuess,
			gameState,
			roomState,
		}
	},
}
</script>

<style lang="scss">
@import '@/styles/variables.scss';

.game {
	display: flex;

	.debug {
		flex: 0 0 300px;
	}
	.main {
		flex: 0 1 100%;
		padding: 2rem;
	}
}
</style>
