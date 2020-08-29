<template>
	<div class="toolbar">
		<button class="toolbar__players-list-btn" @click="playersOpen=!playersOpen">
			<i class="icon"></i>
			<span>{{$store.getters['game/playersLength']}} players online</span>
		</button>
		<div class="toolbar__players card" v-if="playersOpen">
			<ul class="toolbar__players-list">
				<li
					class="toolbar__players-list-item"
					v-for="(player, key, i) in $store.getters['game/players']"
					:key="i"
				>
					<div class="username" v-text="player.username"></div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { ref } from 'vue'
export default {
	name: 'toolbar',
	setup() {
		const playersOpen = ref(false)
		return {
			playersOpen,
		}
	},
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.toolbar {
	background-color: #fff;
	border-top: solid thin $border-color-light;
	box-shadow: $box-shadow-large;
	display: flex;
	align-items: center;
	justify-content: flex-end;

	&__players-list-btn {
		height: 50px;
		background-color: #fff;
		border-left: solid thin $border-color-light;
		padding: 0 2rem;

		&:hover {
			background-color: fade-out(black, 0.9);
		}
		&:active,
		&:focus {
			outline: none;
		}

		.icon {
			display: inline-block;
			background-color: green;
			width: 0.5rem;
			height: 0.5rem;
			border-radius: 50%;
			margin-right: 0.5rem;
		}
	}
	&__players {
		position: absolute;
		width: 250px;
		height: 400px;
		background-color: #fff;
		top: -416px;
		right: 1rem;
	}
	&__players-list {
		margin: 0;
		padding: 0;

		&-item {
			padding: 1rem 1.5rem;
			display: flex;
			align-items: center;

			.username {
				font-size: 1.2rem;
			}

			&:not(:last-child) {
				border-bottom: solid thin $border-color-light;
			}
		}
	}
}
</style>