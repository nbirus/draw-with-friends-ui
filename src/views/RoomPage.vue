<script>
import Chat from '@/components/utils/Chat'
import RoomUsers from '@/components/room/RoomUsers'
import RoomColors from '@/components/room/RoomColors'
import { joinRoom, roomMessage, setReady, roomState, setUserColor } from '@/composition/Room'
import { gameState } from '@/composition/Game'
import { onMounted, ref } from 'vue'
import router from '@/router'

export default {
	name: 'room-page',
	components: { RoomUsers, RoomColors, Chat },
	setup() {
		let message = ref('')
		let currentRoute = router.currentRoute.value
		let roomid = currentRoute.params.id
		let color = ref('')

		onMounted(() => {
			joinRoom(roomid)
		})

		function sendRoomMessage() {
			roomMessage(message.value)
			message.value = ''
		}

		function setColor(color) {
			setUserColor(color)
		}

		return {
			roomState,
			gameState,
			sendRoomMessage,
			message,
			setReady,
			setColor,
		}
	},
}
</script>

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
			<h1>{{ roomState.room.name }}</h1>
		</div>
		<div class="page__body">
			<div class="page__card card">
				<div class="page__card-left">
					<!-- users -->
					<div class="page__card-users">
						<room-users class="page__card-users" v-if="roomState.connected" :users="roomState.room.users"></room-users>
					</div>

					<!-- colors -->
					<div class="page__card-colors">
						<room-colors :value="gameState.color" :users="roomState.room.users" @input="setColor" />
					</div>
				</div>
				<div class="page__card-right">
					<!-- chat -->
					<div class="page__card-chat">
						<chat class="chat" :messages="roomState.room.messages" />
						<div class="page__card-chat-footer">
							<form @submit.prevent="sendRoomMessage">
								<input
									placeholder="Send a message..."
									class="input page__card-chat-input"
									type="text"
									autocomplete="off"
									v-model="message"
								/>
							</form>
						</div>
					</div>

					<!-- ready -->
					<div class="page__card-ready">
						<button
							type="submit"
							class="btn page__card-footer-btn btn-block"
							:class="roomState.ready ? 'btn-green ready' : ''"
							@click="setReady(!roomState.ready)"
						>{{ roomState.ready ? 'Ready' : 'Ready up' }}</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.page {
	padding: 5rem 3rem;
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
		width: 600px;
		padding: 2.5rem;
		display: flex;
		flex-direction: row;

		&-left {
			flex: 0 0 calc(50% - 2rem);
			padding-right: 2rem;
		}
		&-right {
			flex: 0 0 50%;
		}
		&-users {
			display: flex;
			flex-direction: column;
			margin-bottom: 1rem;
		}
		&-colors {
			padding: 0 0.25rem;
			display: flex;
			justify-content: center;
		}
		&-chat {
			width: 100%;
			height: 350px;
			padding: 0;
			background-color: $light;
			margin-bottom: 1rem;
			display: flex;
			flex-direction: column;
			border-radius: $border-radius;
			overflow: hidden;

			.chat {
				flex: 0 1 100%;
				width: 100%;
				overflow-y: scroll;
			}

			&-footer {
				flex: 0 0 auto;
				border-top: solid thin $border-color-light;
			}
			&-input {
				width: 100%;
				margin: 0;
				background-color: transparent;
				border: none;
				overflow: hidden;
			}
			// input {
			// 	border-radius: 0 0 $border-radius $border-radius;
			// }
		}
		&-ready {
			button {
				// background-color: $light;
				border: none;
				height: 50px;
			}
		}
	}
}
</style>
