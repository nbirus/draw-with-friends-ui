<template>
	<div class="page__loading" v-if="roomState.loading">
		<div class="page__loading-content">
			<div class="spinner"></div>
			<div>Connecting...</div>
		</div>
	</div>
	<div class="page__loading error" v-else-if="roomState.error">
		<div class="page__loading-content">
			<h3>This room no longer exists</h3>
			<div>
				<router-link to="/">Back</router-link>
			</div>
		</div>
	</div>
	<div class="page room" v-else>
		<div class="page__header">
			<h1 class="mb-10">{{roomState.room.name}}</h1>
		</div>
		<div class="page__body">
			<div class="page__card card">
				<room-users class="page__card-users" v-if="roomState.connected" :users="roomState.room.users"></room-users>
				<div class="page__card-footer">
					<button class="btn btn-primary btn-block" type="submit">Ready</button>
				</div>
			</div>
			<div class="page__chat card">
				<chat :messages="roomState.room.messages" />
				<div class="page__card-footer">
					<form @submit.prevent="sendRoomMessage">
						<input
							placeholder="Room chat"
							class="input page__chat-input"
							type="text"
							autocomplete="off"
							v-model="message"
						/>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Chat from '@/components/Chat'
import RoomUsers from '@/components/room/RoomUsers'
import {
	joinRoom,
	leaveRoom,
	roomState,
	roomMessage,
} from '@/services/SocketService'
import { onMounted, onBeforeUnmount, ref } from 'vue'
import router from '@/router'

export default {
	name: 'room-page',
	components: { RoomUsers, Chat },
	setup() {
		let message = ref('')
		let currentRoute = router.currentRoute.value
		let roomid = currentRoute.params.id

		onMounted(() => {
			joinRoom(roomid)
		})
		onBeforeUnmount(() => {
			leaveRoom(roomid)
		})

		function sendRoomMessage() {
			roomMessage(message.value)
			message.value = ''
		}

		return {
			roomState,
			sendRoomMessage,
			message,
		}
	},
}
</script>

<style lang="scss" scoped>
.page {
	padding: 3rem;
	opacity: 1;

	&__loading {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: fade-out(white, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 999;

		&.error {
			background-color: fade-out(white, 0.1);
		}

		&-content {
			display: flex;
			align-items: center;

			.spinner {
				margin-right: 1rem;
			}
		}
	}
	&__header {
		margin-bottom: 3rem;
		text-align: center;
	}
	&__body {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	&__card {
		width: 300px;
		padding: 0;
		margin-right: 2rem;

		&-footer {
			padding: 1rem;
		}
	}
	&__chat {
		width: 300px;
		height: 338px;
		padding: 0;

		&-footer {
			padding: 1rem;
		}
		&-input {
			width: 100%;
			margin: 0;
		}
	}
}
</style>