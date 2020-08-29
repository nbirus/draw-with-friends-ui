<script>
export default {
	name: 'lobby-card',
	props: {
		name: String,
		players: Object,
		colors: Array,
	},
	computed: {
		playersLength() {
			let players = Object.values(this.players)
			return players.length
		},
		playersList() {
			let players = Object.values(this.players)
			for (var i = 0; i < 4 - this.playersLength; i++) {
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
	<div ref="card" class="lobby-card card" :class="colors" tabindex="0">
		<div class="lobby-card-popup">
			<span>Join {{name}}</span>
			<span class="player-count">({{playersLength}}/4)</span>
		</div>

		<div class="lobby-card__header">
			<h5>{{name}}</h5>
		</div>
		<ul class="lobby-card__players">
			<li class="lobby-card__player" v-for="(player, i) in playersList" :key="i">
				<div v-if="player.id === 'empty'" class="empty">
					<span class="text">Waiting for player...</span>
				</div>
				<div v-else>
					<span>{{player.username}}</span>
					<i class="icon circle"></i>
				</div>
			</li>
		</ul>
	</div>
</template>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.lobby-card-popup {
	position: absolute;
	border-radius: $border-radius;
	width: 100%;
	height: 40px;
	top: -3rem;
	color: white;
	display: flex;
	align-items: center;
	justify-content: center;
	animation: popup 0.2s ease;
	opacity: 0;
	transform: translateY(1rem);
	overflow: hidden;
	transition: all 0.2s ease;
	background-color: fade-out(black, 0.25);
	font-size: 0.9rem;

	span {
		position: absolute;
	}
	.player-count {
		right: 1rem;
		font-size: 0.8rem;
		color: fade-out(white, 0.25);
	}
}

.lobby-card {
	transition: all 0.2s ease;
	overflow: visible;

	&:hover {
		cursor: pointer;
		transform: scale(1.05);
		box-shadow: $box-shadow-large;

		.lobby-card-popup {
			opacity: 1;
			transform: translateY(0rem);
		}
	}
	&:active {
		transform: scale(1.025);
		box-shadow: $box-shadow;
	}
	&:focus {
		outline: none;

		&:after {
			content: '';
			position: absolute;
			top: -3px;
			right: -3px;
			left: -3px;
			bottom: -3px;
			border: solid 3px fade-out($primary, 0.5);
			border-radius: $border-radius;
		}
	}

	&__header {
		border-bottom: solid thin $border-color-light;
		padding: 1rem 0;
		text-align: center;
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
}
</style>