<template>
	<div class="page game">
		<div class="game__header">
			<router-link class="btn" to="/">Leave Game</router-link>
			<button class="btn" @click="reset">Reset</button>
		</div>
		<div class="game__body">
			<div class="game__board">
				<board ref="board" />
			</div>
		</div>
	</div>
</template>

<script>
import Board from '@/components/Board'

export default {
	name: 'GamePage',
	components: { Board },
	methods: {
		reset() {
			this.$refs.board.reset()
		},
	},
}
</script>

<style lang="scss">
.game {
	display: flex;
	flex-direction: column;

	&__header {
		flex: 0 0 auto;
		padding: 1rem;
		border-bottom: solid thin grey;
	}
	&__body {
		flex: 1 1 100%;

		display: flex;
		align-items: center;
		justify-content: center;
	}
	&__board {
		position: relative;
		height: 100%;
		border: solid thin grey;
	}
}
</style>
