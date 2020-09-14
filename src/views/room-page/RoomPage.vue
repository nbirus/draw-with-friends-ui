<script>
import Chat from '@/views/room-page/RoomPageChat'
import RoomUsers from '@/views/room-page/RoomUsers'
import Modal from '@/components/Modal'

import { joinRoom, roomMessage, setReady, roomState, setUserColor } from '@/composition/Room'
import { gameState } from '@/composition/Game'
import { computed, onMounted, ref } from 'vue'
import get from 'lodash/get'
import router from '@/router'

export default {
	name: 'room-page',
	components: { RoomUsers, Modal, Chat },
	setup() {
		let shareDialog = ref(false)
		let message = ref('')
		let usersLength = computed(() => {
			return Object.keys(get(roomState, 'room.users', {})).length
		})
		let currentRoute = router.currentRoute.value
		let roomid = currentRoute.params.id

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
			shareDialog,
			roomState,
			gameState,
			sendRoomMessage,
			message,
			setReady,
			setColor,
			usersLength,
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
			<h3>This room no longer exists, create or join another</h3>
			<div>
				<router-link to="/">
					<i class="ri-arrow-left-fill"></i>
					Return home
				</router-link>
			</div>
		</div>
	</div>
	<div class="page room" v-else>
		<div class="page__header">
			<h1>{{ roomState.room.name }}</h1>
		</div>
		<div class="page__body">
			<div class="page__card card" :class="{ 'ready': roomState.ready }">
				<div class="page__card-left">
					<!-- users -->
					<div class="page__card-users">
						<room-users
							class="page__card-users"
							v-if="roomState.connected"
							:users="roomState.room.users"
							@input="setColor"
							@share="shareDialog = true"
						></room-users>
					</div>

					<!-- ready -->
					<div class="page__card-ready">
						<button
							type="submit"
							class="btn page__card-ready-btn btn-block"
							:class="{ 'btn-green ready': roomState.ready, 'not-enough': usersLength === 1 }"
							@click="setReady(!roomState.ready)"
						>
							<span></span>
							<i class="ri-close-fill" v-if="!roomState.ready"></i>
							<i class="ri-check-fill" v-else></i>
						</button>
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
									maxlength="60"
									autocomplete="off"
									v-model="message"
								/>
								<i class="ri-send-plane-fill"></i>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>

		<modal width="500" :open="shareDialog" @close="shareDialog=false">
			<div class="page__share">
				<h5>Share this link with your friends</h5>

				<form class="page__form card card-form" @submit.prevent="setUser">
					<div class="input-group">
						<input
							required
							class="input input-medium"
							maxlength="15"
							placeholder
							type="text"
							:value="`localhost:8080${$route.fullPath}`"
						/>
					</div>
					<button class="btn btn-primary btn-medium" type="submit">
						<i class="ri-clipboard-line"></i> Copy
					</button>
				</form>
			</div>
		</modal>
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
			background-color: fade-out(white, 0.2);

			a {
				border: solid thin $border-color;
				padding: 1rem 2rem;
				margin-top: 1rem;
				border-radius: $border-radius;
				color: $text;
				text-decoration: none;

				display: flex;
				align-items: center;

				i {
					margin-right: 0.5rem;
				}
			}
		}

		&-content {
			display: flex;
			align-items: center;
			flex-direction: column;

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
		min-width: 675px;
		width: 675px;
		height: 450px;
		display: flex;
		flex-direction: row;
		overflow: hidden;

		&.ready {
			&:after {
				content: '';
				box-shadow: inset 0 0 0 2px $green;
				border-radius: $border-radius;
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				pointer-events: none;
			}
		}

		&-left {
			flex: 0 0 50%;
		}
		&-right {
			flex: 0 0 50%;
		}
		&-users {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 1.25rem 1.75rem;
		}
		&-colors {
			padding: 0 0.25rem;
			display: flex;
			justify-content: center;
		}
		&-chat {
			width: 100%;
			height: 100%;
			padding: 0;
			border-left: solid thin $border-color-light;
			background-color: lighten($text, 90);
			margin-bottom: 1rem;
			display: flex;
			flex-direction: column;

			.chat {
				flex: 0 1 100%;
				width: 100%;
			}

			&-footer {
				flex: 0 0 auto;
				border-top: solid thin $border-color-light;
				position: relative;

				i {
					font-size: 1.3rem;
					position: absolute;
					top: 1rem;
					right: 2rem;
					color: $text;
				}
			}
			&-input {
				width: 100%;
				margin: 0;
				height: 50px;
				background-color: transparent;
				border: none;
				overflow: hidden;
				box-shadow: none;
				outline: none !important;
				border-radius: 0px;
				padding-right: 4rem;
			}
		}
		&-ready {
			padding: 1rem;
			border-top: solid thin $border-color-light;

			&-btn {
				border: solid thin $border-color-light;
				height: 50px;
				position: relative;

				span:after {
					content: 'Not ready';
				}
				&.ready {
					border: solid thin darken($green, 10);

					span:after {
						content: 'Ready';
					}
				}
				&.not-enough {
					pointer-events: none;
					cursor: not-allowed;
					opacity: 0.75;
					span:after {
						font-size: 0.9rem;
						content: 'Waiting for one more player...';
					}
					i {
						display: none;
					}
				}
				i {
					position: absolute;
					// background-color: darken($light, 5);
					border: none;
					height: 35px;
					width: 35px;
					border-radius: 50%;
					top: 0.5rem;
					right: 0.5rem;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 1.5rem;
					color: darken($light, 30);
				}
				&.ready {
					i {
						background-color: darken($green, 5);
						color: white;
					}

					background: repeating-linear-gradient(
						45deg,
						lighten($green, 0),
						lighten($green, 0) 2rem,
						darken($green, 2) 2rem,
						darken($green, 2) 4rem
					);
					background-size: 200% 200%;
					animation: barberpole 25s linear infinite;
				}

				&:active,
				&:focus {
					outline: none;
				}

				background: repeating-linear-gradient(
					45deg,
					lighten($light, 0),
					lighten($light, 0) 2rem,
					darken($light, 2) 2rem,
					darken($light, 2) 4rem
				);
				background-size: 200% 200%;
				animation: barberpole 25s linear infinite;
			}
		}
	}
	&__share {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 2.5rem 1rem;

		h5 {
			margin: 0 0 1.5rem;
		}
	}
	&__form {
		overflow: visible;

		.input {
			width: 265px;
		}
		.btn {
			font-size: 1rem;
			padding: 0 1rem;
		}
	}
}

@keyframes barberpole {
	100% {
		background-position: 100% 100%;
	}
}
</style>
