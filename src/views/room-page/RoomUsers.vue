<template>
	<ul class="users">
		<li
			class="users__user"
			v-for="(user, i) in usersList"
			:key="i"
			:class="[user.color, `striped-${user.color}`, `ready-${user.ready}`]"
		>
			<!-- empty -->
			<button
				v-if="user.userid === 'empty'"
				class="btn text users__user-empty"
				:class="rooms ? 'rooms' : ''"
				@click="$emit('share')"
			>
				<i :class="rooms ? 'ri-user-line' : 'ri-user-add-line'"></i>
			</button>

			<!-- username -->
			<div class="flex" v-else>
				<button
					class="btn btn-color left"
					v-if="userState.userid === user.userid && !roomState.ready"
					@click="changeColor"
				>
					<i class="ri-arrow-left-s-line"></i>
				</button>
				<button
					class="btn btn-color right"
					v-if="userState.userid === user.userid && !roomState.ready"
					@click="changeColor(true)"
				>
					<i class="ri-arrow-right-s-line"></i>
				</button>

				<div class="users__user-username">{{user.username}}</div>
				<div class="users__user-ready" v-if="user.ready">
					<i class="ri-check-line"></i>
				</div>
			</div>
		</li>
	</ul>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { userState } from '@/composition/User'
import { roomState } from '@/composition/Room'

export default {
	name: 'room-users',
	props: {
		users: Object,
		rooms: Boolean,
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

		let colors = ['blue', 'olive', 'orange', 'red', 'fuchsia', 'purple']
		function changeColor(right) {
			let user = roomState.room.users[userState.userid]
			let activeColorIndex = colors.findIndex(c => c === user.color)

			let newColor = true
			let newColorIndex = activeColorIndex

			if (right) {
				while (newColor) {
					newColorIndex++
					if (newColorIndex === colors.length) {
						newColorIndex = 0
					}
					if (!colorTaken(newColorIndex)) {
						newColor = false
					}
				}
			} else {
				while (newColor) {
					newColorIndex--
					if (newColorIndex === -1) {
						newColorIndex = colors.length - 1
					}
					if (!colorTaken(newColorIndex)) {
						newColor = false
					}
				}
			}

			this.$emit('input', colors[newColorIndex])
		}

		function colorTaken(colorIndex) {
			let users = roomState.room.users
			let takenIndexes = Object.values(users).map(user => colors.findIndex(c => c === user.color))
			return takenIndexes.includes(colorIndex)
		}

		return { usersList, userState, roomState, changeColor }
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
		color: white;
		transition: all 0.2s ease;

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
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 50%;
			position: absolute;
			top: 0.8rem;
			right: 0.8rem;
			width: 32px;
			height: 32px;
			background-color: $green;

			font-size: 1.1rem;
		}
		&-empty {
			height: 60px;
			padding: 0.5rem 0 0;
			margin: 0;
			width: 100%;
			border-radius: $border-radius;
			position: absolute;
			border: none;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: $light;
			font-size: 2.25rem;

			&.rooms {
				pointer-events: none;
			}

			&:focus {
				outline: none;
				background-color: darken($light, 15) !important;
			}

			i {
				opacity: 0.25;
			}

			&:hover {
				background-color: darken($light, 5);
			}
		}

		.icon {
			position: absolute;
			right: 1rem;
		}
		&.ready-true {
			box-shadow: inset 0 0 0 5px $green;

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

.btn-color {
	position: absolute;
	top: 0.65rem;
	background-color: transparent;
	border: none;
	color: white;
	width: 40px;
	height: 40px;
	padding: 0;
	margin: 0;
	border-radius: 50% !important;
	font-size: 1.5rem;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1;

	&:hover {
		background-color: fade-out(black, 0.9);
	}
	&:focus {
		outline: none;
	}

	&.left {
		left: 0.25rem;
	}
	&.right {
		right: 0.25rem;
	}
}
</style>