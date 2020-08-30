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
						:value="userState.username"
					/>
				</div>
				<button class="btn btn-primary btn-large" type="submit">Next</button>
			</form>
		</div>
	</div>
</template>

<script>
import { setUsername, userState } from '@/services/SocketService'
import router from '@/router'
export default {
	name: 'login',
	setup() {
		function setUser(e) {
			setUsername(e.target[0].value)
			router.push('/')
		}
		return { setUser, userState }
	},
}
</script>

<style lang="scss" scoped>
.page {
	display: flex;
	justify-content: center;

	&__container {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 30vh;
	}

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