<script>
import Chat from '@/views/room-page/RoomPageChat'
import RoomUsers from '@/views/room-page/RoomUsers'
import Modal from '@/components/Modal'

import { joinRoom, roomMessage, setReady, setTyping, roomState, setUserColor } from '@/composition/Room'
import { gameState } from '@/composition/Game'
import { computed, onMounted, ref, watch } from 'vue'
import get from 'lodash/get'
import router from '@/router'
import copy from 'copy-to-clipboard'

export default {
	name: 'room-page',
	components: { RoomUsers, Modal, Chat },
	setup() {
		let shareInput = ref(null)
		let shareDialog = ref(false)
		let copied = ref(false)
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

		function copyLink() {
			copy(`drawguys.com/${roomid}`)
			copied.value = true
		}
		function focusLink() {
			shareInput.value.select()
		}

		watch(shareDialog, flag => {
			if (flag) {
				copied.value = false
				focusLink()
			}
		})

		return {
			copied,
			shareInput,
			shareDialog,
			roomState,
			gameState,
			sendRoomMessage,
			message,
			setReady,
			setColor,
			usersLength,
			copyLink,
			focusLink,
			setTyping,
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
	<div class="page room" :class="roomState.color" v-else>
		<div class="page__header">
			<h1>{{ roomState.room.name }}</h1>
		</div>
		<div class="page__body">
			<div class="page__card card" :class="{ ready: roomState.ready }">
				<div class="page__card-left">
					<!-- users -->
					<div class="page__card-users">
						<room-users
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
							:class="[{ [`striped-${roomState.color} ready`]: roomState.ready, 'striped-light': !roomState.ready, 'not-enough': usersLength === 1 }]"
							@click="setReady(!roomState.ready)"
						>
							<span></span>
							<div class="icon">
								<i class="ri-forbid-line" v-if="usersLength === 1"></i>
								<i class="ri-close-fill" v-else-if="!roomState.ready"></i>
								<i class="ri-check-fill" v-else></i>
							</div>
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
									@keydown="setTyping(true)"
									@keypress.enter="setTyping(false)"
									@keypress.delete="setTyping(false)"
									@blur="setTyping(false)"
								/>
								<i class="ri-send-plane-fill"></i>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>

		<modal width="400" :open="shareDialog" @close="shareDialog = false">
			<div class="page__share">
				<div class="page__share-header">
					<i class="ri-share-line mr-2"></i>
					<h5>Share this link with your friends...</h5>
				</div>

				<form class="page__form card card-form" @submit.prevent="copyLink">
					<div class="input-group">
						<input
							ref="shareInput"
							class="input input-medium"
							maxlength="15"
							placeholder
							type="text"
							@input.prevent="() => {}"
							@focus="focusLink"
							:value="`drawguys.com${$route.fullPath}`"
						/>
					</div>

					<button class="btn btn-medium btn-primary" type="submit">Copy</button>
				</form>
			</div>
		</modal>

		<modal width="250" :open="roomState.countDown">
			<div class="page__countdown">
				<h5 class="mb-2">Game starts in...</h5>
				<h1 class="mb-4">{{ roomState.countDownTimer }}</h1>
				<button class="btn btn-grey btn-block" @click="setReady(false)">Stop</button>
			</div>
		</modal>
	</div>
</template>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.page {
	padding: 5rem 3rem;
	opacity: 1;

	@each $color, $name in $colors {
		&.#{$name} {
			.ready:after {
				box-shadow: inset 0 0 0 3px $color;
			}
			.page__card-ready-btn.ready {
				box-shadow: inset 0 0 0 3px darken($color, 15);
				.icon {
					background-color: darken($color, 15);
					color: white;
				}
			}
		}
	}

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

		&:after {
			content: '';
			box-shadow: inset 0 0 0 0 $green;
			border-radius: $border-radius;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			pointer-events: none;
			transition: box-shadow 0.2s ease;
		}

		&-left {
			flex: 0 0 50%;
			display: flex;
			flex-direction: column;
		}
		&-right {
			flex: 0 0 50%;
		}
		&-users {
			flex: 0 1 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding: 0 2rem;
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
					right: 1rem;
					color: $text-light;
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

				&:focus {
					background-color: lighten($light, 2);
				}
			}
		}
		&-ready {
			padding: 0.75rem 1rem;
			border-top: solid thin $border-color-light;

			&-btn {
				border: solid thin $border-color-light;
				height: 55px;
				position: relative;
				border-radius: none;
				font-weight: 700;

				span:after {
					content: 'Not ready';
					color: lighten($text, 30);
				}
				&.ready {
					.icon {
						opacity: 1;
					}
					span:after {
						content: 'Ready';
						color: white;
					}
				}
				&.not-enough {
					pointer-events: none;
					cursor: not-allowed;
					opacity: 0.75;
					span:after {
						font-size: 0.9rem;
						content: 'Waiting for one more player...';
						color: lighten($text, 40);
					}
					i {
						font-weight: 400;
						font-size: 1.2rem;
					}
				}
				.icon {
					font-weight: 100;
					position: absolute;
					border: none;
					top: 0rem;
					left: 0rem;
					width: 3rem;
					height: 3rem;
					border-radius: $border-radius 0 0 0;
					font-size: 1.2rem;
					clip-path: polygon(0 0, 0 85%, 100% 0);
					opacity: 0;

					i {
						position: absolute;
						top: 0.25rem;
						left: 0.35rem;
					}
				}

				&:active,
				&:focus {
					outline: none;
				}
			}
		}
	}
	&__share {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1.5rem 0 0;
		overflow: visible;

		&-header {
			margin: 0 0 1.5rem;
			display: flex;
			align-items: center;
			flex-direction: column;

			h5 {
				font-weight: 300;
			}
			i {
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 2rem;
				margin-bottom: 0.25rem;
				background-color: fade-out($text, 0.95);
				border-radius: 50%;
				padding: 1.25rem;
				height: 18px;
				width: 18px;
			}
		}
	}
	&__form {
		box-shadow: none;
		border: none;
		border-radius: 0 0 $border-radius $border-radius;
		border-top: solid thin $border-color;

		.input {
			width: 288px;
			text-align: center;
			font-weight: 200;
			color: $blue;
			text-decoration: underline;

			&::selection {
				color: white;
				background: $blue;
			}
		}
		.btn {
			font-size: 1rem;
			padding: 0 1rem;
			font-weight: 700;

			&:disabled {
				pointer-events: none;
			}
		}
	}
	&__countdown {
		padding: 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
}

@keyframes barberpole {
	100% {
		background-position: 100% 100%;
	}
}
</style>
