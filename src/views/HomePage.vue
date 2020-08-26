<template>
	<div class="page home">
		<div class="page__header">
			<h1>Draw with Teams</h1>
		</div>
		<div class="page__body">
			<!-- connected -->
			<div class="mb-5" v-if="socketState.connected">
				<div><b>Connected</b></div>

				<hr />

				Players in lobby:
				<ul>
					<li v-for="(player, i) in socketState.players" :key="i">
						{{ player }}
					</li>
				</ul>

				<hr />
				<router-link
					v-if="socketState.connected"
					to="/play"
					class="btn btn-primary btn-large"
					>Start Game</router-link
				>
			</div>

			<!-- not connected -->
			<div v-else>
				Not Connected
				<form @submit.prevent="connect">
					<input
						placeholder="Set username"
						type="text"
						:value="$store.getters['username']"
					/>
					<button type="submit">connect</button>
				</form>
			</div>
		</div>

		<span v-if="socketState.loading">Connecting...</span>
	</div>
</template>

<script>
import useSocket from '@/composition/Socket'

export default {
	name: 'Home',
	setup() {
		return {
			...useSocket,
		}
	},
}
</script>

<style lang="scss" scoped>
.page {
	padding: 3rem;

	&__header {
		margin-bottom: 3rem;
	}
}
</style>
