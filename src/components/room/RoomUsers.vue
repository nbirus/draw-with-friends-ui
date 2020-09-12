<template>
	<ul class="users">
		<li
			class="users__user"
			v-for="(user, i) in usersList"
			:key="i"
			:class="[user.color, `ready-${user.ready}`]"
		>
			<!-- empty -->
			<div v-if="user.userid === 'empty'" class="text empty"></div>

			<!-- username -->
			<div class="flex" v-else>
				<div class="users__user-username">{{user.username}}</div>
				<div class="users__user-ready">
					<div class="ready-icon"></div>
				</div>
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
	width: 100%;
	margin: 0;
	padding: 0;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: auto auto;
	grid-gap: 1rem;

	&__user {
		height: 60px;
		width: 100%;
		margin: 0;
		position: relative;
		background-color: $light;
		border-radius: $border-radius;
		border-radius: $border-radius;
		overflow: hidden;

		.flex {
			display: flex;
			align-items: center;
			height: 100%;
		}

		&-username {
			padding: 0 1.5rem;
			flex: 0 1 100%;
			font-size: 1.2rem;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		&-ready {
			flex: 0 0 60px;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 60px 0 0 0;
			display: none;

			.ready-icon {
				width: 2rem;
				height: 2rem;
				border-radius: 50%;
			}
		}

		.icon {
			position: absolute;
			right: 1rem;

			&.ready {
				background-color: $green;
			}
		}

		@each $color, $name in $colors {
			&.#{$name} {
				background-color: $color;
				color: lighten($color, 60);

				&.ready-true {
					box-shadow: inset 0 0 0 4px $green;
					&:after {
						content: '';
						position: absolute;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
					}

					.users__user-ready {
						background-color: $green;
					}
				}
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
	background-color: $light;

	display: flex;
	align-items: center;
	padding: 0 1.5rem;

	font-size: 0.9rem;
	color: $text-light;
}
</style>