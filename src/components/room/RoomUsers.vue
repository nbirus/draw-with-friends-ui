<template>
	<ul class="users">
		<li class="users__user" v-for="(user, i) in usersList" :key="i">
			<div v-if="user.userid === 'empty'" class="empty">
				<span class="text">Waiting for user...</span>
			</div>
			<div v-else>
				<span>{{user.username}}</span>
				<i class="icon circle" :class="{ ready: user.ready }"></i>
			</div>
		</li>
	</ul>
</template>

<script>
import { ref, computed, watch } from 'vue'

export default {
	name: 'room-users',
	props: {
		users: Object,
	},
	setup(props) {
		const usersList = ref([])
		watch(
			() => props.users,
			users => {
				usersList.value = Object.values(users)
				const usersLength = Object.values(users).length
				for (var i = 0; i < 4 - usersLength; i++) {
					usersList.value.push({
						userid: 'empty',
					})
				}
			},
			{
				immediate: true,
			}
		)

		return { usersList }
	},
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.users {
	margin: 0;
	padding: 0;

	&__user {
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

			&.ready {
				background-color: $green;
			}
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