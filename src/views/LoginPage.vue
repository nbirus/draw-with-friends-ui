<template>
	<div class="page">
		<div class="page__container">
			<h1 class="mb-6">Choose a username</h1>
			<form @submit.prevent="setUser">
				<div class="input-group">
					<input
						class="input input-large mr-3"
						placeholder="Username"
						type="text"
						:value="$store.getters['username']"
					/>
				</div>
				<button class="btn btn-primary btn-large" type="submit">Next</button>
			</form>
		</div>
	</div>
</template>

<script>
import { ref } from 'vue'
import store from '@/store'
import router from '@/router'

export default {
	name: 'login',
	setup() {
		function setUser(e) {
			store.dispatch('setUserid')
			store.dispatch('setUsername', e.target[0].value)
			router.push('/')
		}

		return { setUser }
	},
}
</script>

<style lang="scss" scoped>
.page {
	display: flex;
	// align-items: center;
	justify-content: center;
	padding-top: 20vh;

	.input {
		width: 350px;
	}
	.btn {
		width: auto;
	}

	form {
		display: flex;
	}
}
</style>