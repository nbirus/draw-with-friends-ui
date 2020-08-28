<script>
export default {
	name: 'lobby-card',
	props: {
		name: String,
		players: Object,
	},
	computed: {
		playersList() {
			let players = Object.values(this.players)
			let playersLength = players.length
			for (var i = 0; i < 4 - playersLength; i++) {
				players.push({
					id: 'empty',
				})
			}
			return players
		},
	},
}
</script>

<template>
	<div class="lobby-card card">
		<div class="lobby-card__header">
			<h5>{{name}}</h5>
		</div>
		<ul class="lobby-card__players">
			<li class="lobby-card__player" v-for="(player, i) in playersList" :key="i">
				<div v-if="player.id !== 'empty'">
					<span>{{player.username}}</span>
					<i class="icon circle"></i>
				</div>
				<div class="empty" v-else>
					<span class="text">Waiting for player...</span>
					<button class="btn btn-text btn-lobby">
						<i class="icon">+</i>
						Join room
					</button>
				</div>
			</li>
		</ul>
	</div>
</template>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.lobby-card {
	&__header {
		border-bottom: solid thin $border-color-light;
		padding: 1rem 0;
	}
	&__players {
		padding: 0;
		margin: 0;
	}
	&__player {
		height: 64px;
		padding: 0 1rem;
		position: relative;

		display: flex;
		align-items: center;
		justify-content: center;

		&:not(:last-child) {
			border-bottom: solid thin $border-color-light;
		}

		.icon {
			position: absolute;
			right: 1rem;
			background-color: fade-out(black, 0.9);
			width: 1rem;
			height: 1rem;
			border-radius: 50%;
		}
	}
}
.empty {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: fade-out(black, 0.99);

	display: flex;
	align-items: center;
	justify-content: center;

	.text {
		font-size: 0.9rem;
		color: $text-light;
	}

	.btn {
		opacity: 0;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: unset;
		border-radius: 0;
		// background-color: $primary;
		transition: opacity 0.05s ease;

		.icon {
			position: absolute;
			left: 1.5rem;
		}
	}
	&:hover {
		.btn {
			opacity: 1;
		}
	}
}
</style>