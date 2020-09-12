<script>
import { ref } from 'vue'
import RoomUsers from '@/components/room/RoomUsers'

export default {
	name: 'room-card',
	components: { RoomUsers },
	props: {
		name: String,
		roomid: String,
		userid: String,
		users: Object,
		colors: Array,
	},
	setup(props) {
		const usersList = ref(Object.values(props.users))
		const usersLength = Object.values(props.users).length

		for (var i = 0; i < 4 - usersLength; i++) {
			usersList.value.push({
				userid: 'empty',
			})
		}

		return {
			usersList,
			usersLength,
		}
	},
}
</script>

<template>
	<router-link :to="`/${roomid}`" ref="card" class="room-card card" :class="colors" tabindex="0">
		<div class="room-card-popup">
			<span>Join</span>
			<span class="name">{{name}}</span>
		</div>

		<div class="room-card__header">
			<h3>{{name}}</h3>
			<div class="room-card__header-players">{{usersLength}}/4</div>
		</div>

		<room-users class="room-card__users" :users="users"></room-users>
	</router-link>
</template>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.room-card-popup {
	position: absolute;
	border-radius: $border-radius;
	width: 200px;
	height: 40px;
	top: -3rem;
	color: white;
	display: flex;
	align-items: center;
	justify-content: center;
	animation: popup 0.2s ease;
	opacity: 0;
	transform: translateY(1rem);
	overflow: hidden;
	transition: all 0.2s ease;
	background-color: fade-out(black, 0.25);
	font-size: 0.9rem;
	left: calc(50% - 100px);

	span {
		// position: absolute;
	}
	.name {
		margin-left: 0.5ch;
		text-decoration: underline;
	}
	.user-count {
		right: 1rem;
		font-size: 0.8rem;
		color: fade-out(white, 0.25);
	}
}

.room-card {
	transition: all 0.2s ease;
	overflow: visible;
	color: $text;
	text-decoration: unset;
	width: 520px;

	&:hover {
		cursor: pointer;
		transform: scale(1.05);
		box-shadow: $box-shadow-large;

		.room-card-popup {
			opacity: 1;
			transform: translateY(0rem);
		}
	}
	&:active {
		transform: scale(1.025);
		box-shadow: $box-shadow;
	}
	&:focus {
		outline: none;

		&:after {
			content: '';
			position: absolute;
			top: -3px;
			right: -3px;
			left: -3px;
			bottom: -3px;
			border: solid 3px fade-out($primary, 0.5);
			border-radius: $border-radius;
		}
	}

	&__header {
		padding: 1rem 1.5rem 0.5rem;

		h3 {
			font-size: 1.75rem;
		}
		&-players {
			position: absolute;
			top: 2rem;
			right: 2rem;
			color: $text-light;
			font-size: 1rem;
			padding: 0.5rem 0.75rem;
		}
	}
	&__users {
		padding: 0.5rem 1.5rem 1.5rem;
		margin: 0;
	}
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
		}
	}
}
.empty {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	align-items: center;
	justify-content: center;

	.text {
		font-size: 0.9rem;
		color: $text-light;
	}
}
</style>