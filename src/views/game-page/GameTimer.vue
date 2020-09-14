<template>
	<div
		class="game-timer"
		v-if="['turn-pre', 'turn-start'].includes(gameState.event)"
		:class="roomState.room.users[gameState.turnUser.userid].color"
	>
		<i class="ri-timer-fill"></i>
		<div
			class="bar"
			:class="[{ 'transition-width': gameState.event === 'turn-start' }, `striped-${roomState.room.users[gameState.turnUser.userid].color}`]"
		></div>
	</div>
</template>

<script>
import { gameState } from '@/composition/Game'
import { roomState } from '@/composition/Room'
export default {
	name: 'game-timer',
	setup() {
		return {
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
	height: 24px;
	border-radius: 1rem;

	background-color: lighten($grey, 20);
	margin-bottom: 1.5rem;

	i {
		display: flex;
		align-items: center;
		justify-content: center;
		color: lighten($text, 10);
		font-size: 1.5rem;
		background-color: lighten($grey, 20);
		width: 2.75rem;
		height: 2.75rem;
		border-radius: 50%;
		position: absolute;
		top: -0.65rem;
	}

	.bar {
		position: absolute;
		left: 2.75rem;
		top: 6px;
		bottom: 6px;
		width: calc(100% - 2.75rem - 6px);
		border-radius: 1rem;
		background-color: lighten($grey, 0);
		transition: width 10s;
	}

	@each $color, $name in $colors {
		&.#{$name} {
			background-color: lighten($color, 40);

			i {
				color: darken($color, 30);
				background-color: lighten($color, 40);
			}
		}
	}
}

.transition-width {
	width: 0px !important;
}
</style>
