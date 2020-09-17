<template>
	<div class="game-header">
		<ul class="game-header__users">
			<li
				class="game-header__user"
				v-for="(user, userid) in roomState.users"
				:key="userid"
				:class="[{ match: user.match, turn: gameState.turnUser.userid === userid }, `striped-${user.color}`]"
			>
				<div class="game-header__user-username" v-text="user.username"></div>
				<div class="game-header__user-score">
					<i class="ri-pencil-fill" v-if="gameState.turnUser.userid === userid"></i>
					<span v-else v-text="user.score"></span>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
import { roomState } from '@/composition/Room'
import { gameState } from '@/composition/Game'

export default {
	name: 'game-header',
	setup() {
		return {
			roomState,
			gameState,
		}
	},
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.game-header {
	&__users {
		padding: 0;
		margin: 0;
		display: flex;
		align-items: center;
	}
	&__user {
		color: white;
		display: flex;
		align-items: center;
		margin-right: 1rem;
		border-radius: $border-radius;
		border: solid thin $border-color-light;
		transition: all 0.2s ease;

		&.match {
			background-color: $green;
		}
		&.turn {
			box-shadow: $box-shadow;
		}

		&-username {
			padding: 1rem;
			min-width: 120px;
			font-size: 1.05rem;
		}
		&-score {
			padding: 1.25rem;
			font-size: 1.2rem;
			font-weight: 900;
			background-color: fade-out($text, 0.8);
		}
	}
}
</style>
