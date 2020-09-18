<template>
	<div class="game-toolbar card" v-if="['turn-start'].includes(gameState.event)">
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
			<button class="btn btn-medium" :class="`-${roomState.color}`">Send</button>
		</form>
		<div class="game__toolbar-drawkit" v-else>
			<span>{{gameState.word}}</span>
		</div>
	</div>
</template>

<script>
import { roomState } from '@/composition/Room'
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
			roomState,
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
		.btn {
			color: white !important;
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
