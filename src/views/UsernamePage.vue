<template>
	<div class="page">
		<div class="page__container">
			<h1>Choose a username</h1>

			<form class="page__form card card-form" @submit.prevent="setUser">
				<div class="input-group">
					<input
						required
						class="input input-large"
						maxlength="20"
						placeholder="Enter a username..."
						type="text"
						v-model="userState.username"
					/>
				</div>
				<button class="btn btn-primary btn-large" type="submit">Next</button>
			</form>
		</div>
	</div>
</template>

<script>
import { setUsername, userState } from '@/composition/User'
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

		h1 {
			margin-bottom: 3rem;
		}
	}

	.input {
		width: 350px;
	}
	.btn {
		width: auto;
		display: flex;
		align-items: center;
	}

	form {
		display: flex;
	}
}
</style>
