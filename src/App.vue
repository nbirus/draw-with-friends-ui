<template>
	<div id="app">
		<router-view v-if="authenticated" />
		<div v-else>
			<form @submit.prevent="setUser">
				<input
					class="input mr-3"
					placeholder="Set username"
					type="text"
					:value="$store.getters['username']"
				/>
				<button class="btn btn-primary" type="submit">Start</button>
			</form>
		</div>
	</div>
</template>

<script>
import { ref } from 'vue'
import store from '@/store'

export default {
	name: 'app',
	setup() {
		let authenticated = ref(!!store.getters['username'])

		function setUser(e) {
			store.dispatch('setUserid')
			store.dispatch('setUsername', e.target[0].value)
			authenticated.value = true
		}

		return {
			authenticated,
			setUser,
		}
	},
}
</script>

<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
.username-dialog {
	position: fixed;
	width: 100%;
	height: 100%;
}
</style>
