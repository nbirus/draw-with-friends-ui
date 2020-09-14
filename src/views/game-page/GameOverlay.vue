<template>
	<div class="game-overlay">
		<!-- <div
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
		<div v-if="gameState.event === 'turn-end'">{{gameState.turnUser.username}}s turn is over</div>-->
	</div>
</template>

<script>
export default {
	name: 'game-overlay',
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.game-overlay {
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
</style>
