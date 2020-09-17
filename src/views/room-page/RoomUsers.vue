<script>
import { ref, watch } from 'vue'
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

				<div class="users__user-username">{{ user.username }}</div>
				<!-- <div class="users__user-typing" v-if="userState.userid !== user.userid &&  user.typing"> -->
				<div class="users__user-typing" v-if="userState.userid !== user.userid &&  user.typing">
					<div class="dot"></div>
					<div class="dot"></div>
					<div class="dot"></div>
				</div>
				<div class="users__user-ready" v-if="user.ready">
					<i class="ri-check-line"></i>
				</div>
			</div>
		</li>
	</ul>
</template>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.users {
	flex: 0 0 auto;
	width: 100%;
	height: auto;
	margin: 0;
	padding: 0;
	display: grid;
	grid-template-columns: 1fr;

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
			position: absolute;
			top: 0rem;
			left: 0rem;
			width: 3rem;
			height: 3rem;
			border-radius: $border-radius 0 0 0;
			font-size: 1.2rem;
			clip-path: polygon(0 0, 0 85%, 100% 0);

			i {
				position: absolute;
				font-size: 1.2rem;
				top: 0.35rem;
				left: 0.35rem;
			}
		}
		&-typing {
			position: absolute;
			background-color: fade-out(#fff, 0.85);
			padding: 0.5rem 0.5rem;
			border-radius: 25px;
			right: 1rem;
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
			grid-gap: 0.15rem;

			.dot {
				width: 6px;
				height: 6px;
				background-color: fade-out(#fff, 0.15);
				border-radius: 50%;
				animation: dot 1.5s ease-in-out infinite;

				&:nth-child(2) {
					animation-delay: 0.5s;
				}
				&:nth-child(3) {
					animation-delay: 1s;
				}
			}
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
		@each $color, $name in $colors {
			&.#{$name}.ready-true {
				box-shadow: inset 0 0 0 4px darken($color, 15);

				.users__user-ready {
					background-color: darken($color, 15);
				}
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

@keyframes dot {
	0% {
		opacity: 0.5;
	}
	50% {
		opacity: 1;
	}
	100% {
		opacity: 0.5;
	}
}
</style>
