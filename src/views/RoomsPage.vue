<template>
	<div class="page home">
		<div class="page__header">
			<h1 class="mb-6">Create or join a game</h1>
			<form class="page__header-room-form" @submit.prevent="createRoomSubmit">
				<div class="input-group">
					<input
						class="input input-large mr-3"
						maxlength="40"
						placeholder="Enter room name"
						type="text"
						:value="roomName"
					/>
				</div>
				<button class="btn btn-primary btn-large" type="submit">Start</button>
			</form>
		</div>

		<div class="page__body">
			<transition-group name="list" tag="ul" mode="out-in" class="room-list" appear>
				<!-- <li class="room-list__item" key="create">
					<room-create-card class="room-list__card" />
				</li> -->
				<li class="room-list__item" v-for="(room, key, i) in rooms" :key="i" :class="`delay-${i}`">
					<room-card class="room-list__card" v-bind="room"></room-card>
				</li>
			</transition-group>
		</div>
	</div>
</template>

<script>
import RoomCard from '@/components/room/RoomCard'
import RoomCreateCard from '@/components/room/RoomCreateCard'
import { rooms } from '@/composition/Global'
import { createRoom } from '@/composition/Room'
import { ref } from 'vue'

export default {
	name: 'Home',
	components: { RoomCard, RoomCreateCard },
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
	padding: 3rem;
	opacity: 1;

	&__header {
		margin-bottom: 5rem;
		text-align: center;

		&-room-form {
			display: flex;
			align-items: center;
			justify-content: center;

			.input {
				width: 350px;
			}
		}
	}
	&__body {
		margin: 0 auto;
		max-width: 900px;
	}
}
.room-list {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-gap: 2rem;

	&__item {
		min-width: 250px;
	}
}
</style>
