<template>
	<div class="game-timer">
		<div class="game-timer__timer card">{{gameState.timer}}</div>
	</div>
	<!-- <div class="game-timer" :class="get(roomState, `users.${gameState.turnUser.userid}.color`)">
		<i class="ri-timer-fill"></i>
		<div
			class="bar"
			:class="[{ 'transition-width': gameState.event === 'turn-start' }, `striped-${get(roomState, `users.${gameState.turnUser.userid}.color`)}`]"
		></div>
	</div>-->
</template>

<script>
import { gameState } from '@/composition/Game'
import { roomState } from '@/composition/Room'
import { computed } from 'vue'
import get from 'lodash/get'

export default {
	name: 'game-timer',
	setup() {
		return {
			get,
			gameState,
			roomState,
		}
	},
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.game-timer {
	position: absolute;
	display: flex;
	justify-content: center;
	z-index: 99;
	padding-top: 1rem;

	&__timer {
		width: 4.5rem;
		height: 4.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 2.25rem;
		color: $text;
		border-radius: 50%;
		font-weight: 900;
		letter-spacing: 0px;
	}
}
</style>
