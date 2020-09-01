<template>
	<div class="page game">
		<div class="debug">
			<div class="card">
				<pre>{{ gameState }}</pre>
			</div>
			<div class="card">
				<pre>{{ roomState }}</pre>
			</div>
		</div>
		<div class="main">
			<form @submit.prevent="guessSubmit">
				<input
					:disabled="gameState.event !== 'round_start'"
					placeholder="Type to guess..."
					class="input input-medium"
					type="text"
					v-model="guess"
				/>
				<button class="btn btn-primary btn-medium">Send</button>
			</form>
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
	}
}
</style>
