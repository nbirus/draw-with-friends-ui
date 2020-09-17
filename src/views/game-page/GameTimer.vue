<template>
	<div class="game-timer" :class="get(roomState, `users.${gameState.turnUser.userid}.color`)">
		<!-- {{v-if="['turn-pre', 'turn-start'].includes(gameState.event)"}} -->
		<i class="ri-timer-fill"></i>
		<div
			class="bar"
			:class="[{ 'transition-width': gameState.event === 'turn-start' }, `striped-${get(roomState, `users.${gameState.turnUser.userid}.color`)}`]"
		></div>
	</div>
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
	position: relative;
	width: calc(800px - 1rem);
	height: 1.25rem;
	border-radius: 1rem;
	background-color: lighten($grey, 25);
	margin-bottom: 1.5rem;
	opacity: 0.5;

	i {
		display: flex;
		align-items: center;
		justify-content: center;
		color: lighten($text, 10);
		font-size: 1.4rem;
		background-color: lighten($grey, 25);
		padding: 0.5rem;
		border-radius: 50%;
		position: absolute;
		top: -0.5rem;
		left: -0.15rem;
	}
	.bar {
		position: absolute;
		left: 2.5rem;
		top: 6px;
		bottom: 5px;
		width: calc(100% - 2.75rem - 6px);
		border-radius: 1rem;
		background-color: lighten($grey, 10);
		transition: width 10s;
	}

	@each $color, $name in $colors {
		&.#{$name} {
			opacity: 1;
			background-color: darken($color, 30);

			i {
				color: lighten($color, 60);
				background-color: darken($color, 30);
			}
		}
	}
}

.transition-width {
	width: 0px !important;
}
</style>
