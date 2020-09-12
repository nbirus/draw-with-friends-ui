<template>
	<div class="page results-page">
		<div class="card page__card">
			<ul class="users">
				<li class="users__user" v-for="(user, i) in users" :key="i">
					<span class="mr-2">{{i + 1}}</span>
					<span>{{user.username}}</span>
					<i class="icon circle" :class="{ ready: user.ready }"></i>
				</li>
			</ul>
			<button
				class="btn"
				:class="roomState.ready ? 'btn-green ready' : ''"
				@click="setReady(!roomState.ready)"
			>Play again?</button>
		</div>
	</div>
</template>

<script>
import { roomState, setReady } from '@/composition/Room'
import { ref } from 'vue'

export default {
	name: 'game-results-page',
	setup() {
		let users = ref([])

		return {
			users,
			setReady,
			roomState,
		}
	},
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.page {
	display: flex;
	align-items: center;
	justify-content: center;

	&__card {
		padding: 2rem;
		width: 300px;
	}
}
</style>