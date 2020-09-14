<script>
import { ref, watch } from 'vue'

export default {
	name: 'room-card',
	inheritAttrs: false,
	props: {
		name: String,
		roomid: String,
		userid: String,
		users: Object,
		colors: Array,
	},
	setup(props) {
		const usersList = ref([])
		const usersLength = ref(0)

		watch(
			() => props.users,
			users => {
				usersList.value = Object.values(users)
				usersLength.value = Object.values(users).length
				for (var i = 0; i < 4 - usersLength.value; i++) {
					usersList.value.push({
						userid: 'empty',
					})
				}
			},
			{
				immediate: true,
			}
		)

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
		<div class="room-card__body">
			<ul class="room-card__users">
				<li
					class="room-card__users-item"
					v-for="(user, i) in usersList"
					:key="i"
					:class="`striped-${user.color}`"
				>
					<div class="empty" v-if="user.userid === 'empty'">
						<i class="ri-user-line"></i>
					</div>
					<div v-else>
						<div class="users__user-username">{{user.username}}</div>
					</div>
				</li>
			</ul>
		</div>
	</router-link>
</template>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.room-card {
	transition: all 0.2s ease;
	overflow: visible;
	color: $text;
	text-decoration: unset;
	width: 520px;
	display: flex;
	flex-direction: column;

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
	&__body {
		padding: 0 2rem 2rem;
	}
	&__users {
		width: 100%;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: auto auto;
		grid-gap: 1rem;

		&-item {
			height: 60px;
			width: 100%;
			margin: 0;
			position: relative;
			background-color: $light;
			border-radius: $border-radius;
			color: white;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 1.2rem;

			.empty {
				font-size: 1.75rem;
				display: flex;
				align-items: center;
				justify-content: center;
				color: lighten($text, 70);
			}
		}
	}
}

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

	.name {
		margin-left: 0.5ch;
	}
	.user-count {
		right: 1rem;
		font-size: 0.8rem;
		color: fade-out(white, 0.25);
	}
}
</style>