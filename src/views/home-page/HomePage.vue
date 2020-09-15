<template>
	<div class="page home">
		<!-- change name -->
		<router-link to="/username" class="page__change-name-link">
			<span>Change your name</span>
		</router-link>

		<!-- header -->
		<div class="page__header">
			<h1>Create or join a room</h1>
		</div>

		<!-- card form -->
		<form class="page__form card card-form" @submit.prevent="createRoomSubmit">
			<div class="input-group">
				<input
					required
					class="input input-large"
					maxlength="40"
					placeholder="Enter a room name..."
					type="text"
					v-model="roomName"
				/>
			</div>
			<button class="btn btn-primary btn-large" type="submit">Create</button>
		</form>

		<!-- body -->
		<div class="page__body">
			<transition-group name="list" tag="ul" mode="out-in" class="room-list" appear>
				<li class="room-list__item" v-for="(room, key, i) in rooms" :key="i" :class="`delay-${i}`">
					<room-card class="room-list__card" v-bind="room" rooms></room-card>
				</li>
			</transition-group>

			<div class="page__body-empty" v-if="Object.keys(rooms).length === 0">
				<i class="ri-forbid-line mr-2"></i>No rooms found
			</div>
		</div>
	</div>
</template>

<script>
import RoomCard from '@/views/home-page/RoomCard'
import { rooms } from '@/composition/Global'
import { createRoom } from '@/composition/Room'
import { ref } from 'vue'

export default {
	name: 'Home',
	components: { RoomCard },
	setup() {
		const roomName = ref('')
		function createRoomSubmit() {
			createRoom({
				name: roomName.value,
			})
		}

		return {
			rooms,
			roomName,
			createRoomSubmit,
		}
	},
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.page {
	opacity: 1;
	display: flex;
	flex-direction: column;
	padding: 5rem 0;

	&__change-name-link {
		position: fixed;
		bottom: 1rem;
		left: 1rem;
		color: $text;
		text-decoration: underline;
	}
	&__header {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 2.5rem;
	}
	&__form {
		margin-bottom: 2.5rem;
	}
	&__body {
		margin: 0 auto;

		&-empty {
			font-size: 1.5rem;
			color: fade-out($text, 0.65);
			margin-top: 2rem;
			padding: 2rem 3rem;
			border-radius: $border-radius;
			display: flex;
			align-items: center;
			justify-content: center;

			i {
				font-size: 1.65rem;
			}
		}
	}
}
.room-list {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0;
	padding: 0;

	&__item {
		padding: 0;
		margin: 0 0 2rem;
	}
}
</style>
