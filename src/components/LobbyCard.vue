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
				<div v-if="player.id !== 'empty'">{{player.username}}</div>
				<div v-else>Waiting for player...</div>
			</li>
		</ul>
	</div>
</template>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.lobby-card {
	&__header {
		border-bottom: solid thin $border-color;
		padding: 1rem 0;
	}
	&__players {
		padding: 0;
		margin: 0;
	}
	&__player {
		padding: 1.5rem;

		&:not(:last-child) {
			border-bottom: solid thin $border-color;
		}
	}
}
</style>