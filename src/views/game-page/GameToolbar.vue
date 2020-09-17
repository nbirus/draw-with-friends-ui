<template>
	<div class="game-toolbar card">
		<form
			class="game__toolbar-form card-form"
			@submit.prevent="guessSubmit"
			v-if="!gameState.drawing"
		>
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
</template>

<script>
import { gameState, sendGuess } from '@/composition/Game'
import { ref } from 'vue'

export default {
	name: 'game-toolbar',
	setup() {
		const guess = ref('')
		function guessSubmit() {
			sendGuess(guess.value)
			guess.value = ''
		}

		return {
			guess,
			guessSubmit,
			gameState,
		}
	},
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.game-toolbar {
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
</style>
