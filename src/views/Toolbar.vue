<template>
	<div class="toolbar">
		<router-link to="/username" class="toolbar__chat-list-btn">
			<span>Change your name</span>
		</router-link>
		<div class="flex"></div>

		<form @submit.prevent="sendGlobalMessage">
			<input
				id="messageInput"
				placeholder="Say something"
				class="input toolbar__chat-input"
				required
				maxlength="100"
				v-model="message"
				type="text"
				autocomplete="off"
				@focus="messagesOpen=true"
			/>
		</form>

		<button class="toolbar__players-list-btn" @click="usersOpen=!usersOpen">
			<i class="icon"></i>
			<span>{{Object.keys(users).length}} online</span>
		</button>
		<div class="toolbar__players card" v-if="usersOpen">
			<ul class="toolbar__players-list">
				<li class="toolbar__players-list-item" v-for="(user, key, i) in users" :key="i">
					<div class="username" v-text="user.username"></div>
				</li>
			</ul>
		</div>

		<transition name="chat" mode="out-in">
			<div class="toolbar__chat card scroller" ref="messageEl" id="messageEl" v-if="messagesOpen">
				<ul class="toolbar__chat-list">
					<li class="toolbar__chat-list-item" v-for="(message, i) in messages" :key="i">
						<div class="username" v-text="message.username"></div>
						<div class="message" v-text="message.message"></div>
					</li>
				</ul>
			</div>
		</transition>
	</div>
</template>

<script>
import {
	users,
	messages,
	globalMessage,
} from '@/services/SocketService'
import { ref, watch } from 'vue'
export default {
	name: 'toolbar',
	setup() {
		const usersOpen = ref(false)
		const messagesOpen = ref(false)
		const message = ref('')
		let messageEl = ref()

		function sendGlobalMessage() {
			globalMessage(message.value)
			message.value = ''
		}

		watch([messages, messagesOpen], () => {
			gotoBottom(messageEl.value)
		})

		document.addEventListener('click', function(e) {
			var level = 0
			let isOpen = false
			for (
				var element = e.target;
				element;
				element = element.parentNode
			) {
				if (
					element.id === 'messageEl' ||
					element.id === 'messageInput'
				) {
					isOpen = true
					return
				}
				level++
			}

			messagesOpen.value = isOpen
		})

		return {
			users,
			message,
			messageEl,
			messagesOpen,
			messages,
			usersOpen,
			globalMessage,
			sendGlobalMessage,
		}
	},
}

function gotoBottom(element) {
	if (element) {
		element.scrollTop = element.scrollHeight - element.clientHeight
	}
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.toolbar {
	background-color: #fff;
	border-top: solid thin $border-color;
	display: flex;
	align-items: center;
	justify-content: flex-end;

	.flex {
		flex: 0 1 100%;
	}

	&__players-list-btn {
		flex: 0 0 auto;
		height: 55px;
		background-color: #fff;
		padding: 0 2rem;
		margin: 0;
		font-size: 1rem;
		margin-left: 0.5rem;

		&:hover {
			background-color: fade-out(black, 0.9);
		}
		&:active,
		&:focus {
			outline: none;
		}

		.icon {
			display: inline-block;
			background-color: green;
			width: 0.5rem;
			height: 0.5rem;
			border-radius: 50%;
			margin-right: 0.5rem;
		}
	}
	&__players {
		position: absolute;
		width: 250px;
		height: 400px;
		background-color: #fff;
		top: -416px;
		right: 1rem;
	}
	&__players-list {
		margin: 0;
		padding: 0;

		&-item {
			padding: 1rem 1.5rem;
			display: flex;
			align-items: center;

			.username {
				font-size: 1.2rem;
			}

			&:not(:last-child) {
				border-bottom: solid thin $border-color-light;
			}
		}
	}
	&__chat-input {
		width: 300px;
		background-color: lighten($grey, 30);
	}
	&__chat {
		position: absolute;
		width: 300px;
		height: 400px;
		background-color: #fff;
		top: -416px;
		right: 9rem;
		overflow-y: auto;
		z-index: -1;
	}
	&__chat-list {
		margin: 0;
		padding: 0;

		&-item {
			padding: 0.75rem 1rem;
			display: flex;
			flex-direction: column;

			.message {
				font-size: 0.9rem;
				margin-top: 0.5rem;
			}
			.username {
				font-size: 0.8rem;
				color: $text-light;
			}

			&:not(:last-child) {
				border-bottom: solid thin $border-color-light;
			}
		}
	}
}
</style>