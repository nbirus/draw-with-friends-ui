<template>
	<div class="game-board-header">
		<!-- <span
			v-if="gameState.event === 'round-start'"
		>Round {{gameState.round}}/{{gameState.roundEnd}} starting</span>
		<span v-if="gameState.event === 'round-end'">Round over</span>
		<span v-if="gameState.event === 'turn-pre'">{{gameState.turnUser.username}} is about to draw</span>
		<span v-if="gameState.event === 'turn-start'">{{gameState.turnUser.username}} is drawing</span>
		<span v-if="gameState.event === 'turn-end'">{{gameState.turnUser.username}} turn is over</span>-->
	</div>
</template>

<script>
export default {
	name: 'game-board-header',
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.game-overlay-header {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0.5rem 0;
	background-color: transparent;
	color: white;
	font-weight: 900;
	display: none;
}
</style>
