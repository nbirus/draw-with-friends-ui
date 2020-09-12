<template>
	<div class="toolbar">
		<router-link to="/username" class="toolbar__change-name-link">
			<span>Change your name</span>
		</router-link>
		<div class="flex"></div>

		<!-- <form @submit.prevent="sendGlobalMessage">
			<input
				id="chat-input"
				placeholder="Say something..."
				class="input toolbar__chat-input"
				:class="{ open: messagesOpen }"
				required
				maxlength="100"
				v-model="message"
				type="text"
				autocomplete="off"
				@focus="messagesOpen = true"
			/>
		</form>-->

		<!-- <button class="toolbar__players-list-btn" id="users-btn">
			<i class="icon"></i>
			<span>{{ Object.keys(users).length }} online</span>
		</button>
		<transition name="chat" mode="out-in">
			<div class="toolbar__players card" v-if="usersOpen" id="users-card">
				<ul class="toolbar__players-list">
					<li class="toolbar__players-list-item" v-for="(user, key, i) in users" :key="i">
						<div class="username" v-text="user.username"></div>
					</li>
				</ul>
			</div>
		</transition>

		<transition name="chat" mode="out-in">
			<chat class="toolbar__chat card chat" v-if="messagesOpen" :messages="messages" id="chat-card" />
		</transition>-->
	</div>
</template>

<script>
import { users, messages, globalMessage } from '@/composition/Global'
import { ref } from 'vue'
import Chat from '@/components/utils/Chat'

export default {
	name: 'toolbar',
	components: { Chat },
	setup() {
		const usersOpen = ref(false)
		const messagesOpen = ref(false)
		const message = ref('')

		function sendGlobalMessage() {
			globalMessage(message.value)
			message.value = ''
		}

		document.addEventListener('click', function(e) {
			let isOpen = false
			for (var element = e.target; element; element = element.parentNode) {
				if (element.id === 'chat-card' || element.id === 'chat-input') {
					isOpen = true
					return
				}
			}
			messagesOpen.value = isOpen
		})
		document.addEventListener('click', function(e) {
			let isOpen = false
			for (var element = e.target; element; element = element.parentNode) {
				if (element.id === 'users-btn') {
					usersOpen.value = !usersOpen.value
					return
				}
				if (element.id === 'users-card') {
					isOpen = true
					return
				}
			}
			usersOpen.value = isOpen
		})

		return {
			users,
			message,
			messagesOpen,
			messages,
			usersOpen,
			globalMessage,
			sendGlobalMessage,
		}
	},
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.toolbar {
	// background-color: darken($primary, 2);
	display: flex;
	align-items: center;
	justify-content: flex-end;
	position: fixed;
	bottom: 0;

	.flex {
		flex: 0 1 100%;
	}

	&__change-name-link {
		flex: 0 0 auto;
		margin-left: 1rem;
		color: $text;
		text-decoration: underline;
	}
	&__players-list-btn {
		flex: 0 0 auto;
		height: 40px;
		border-radius: $border-radius;
		background-color: transparent;
		// color: white;
		padding: 0 1rem;
		margin: 0;
		font-size: 1rem;
		margin-left: 0.5rem;
		margin-right: 1rem;

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
		position: fixed;
		width: 250px;
		height: auto;
		background-color: #fff;
		top: 4.25rem;
		right: 1rem;
		padding: 0.5rem 0;
		box-shadow: $box-shadow-small;
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
		width: 200px;
		// background-color: lighten($grey, 30);
		background-color: fade-out(black, 0.9);
		color: white;
		border: none;
		transition: width 0.2s ease;

		&::placeholder {
			color: fade-out($text, 0.5);
		}
		&:focus,
		&.open {
			width: 300px;
			background-color: white;
			color: $text;

			&::placeholder {
				color: fade-out($text, 0.25);
			}
		}
	}
	&__chat {
		position: fixed;
		width: 300px;
		max-height: 400px;
		height: auto;
		background-color: #fff;
		top: 4.25rem;
		right: 8rem;
		overflow-y: auto;
		z-index: -1;
		box-shadow: $box-shadow-small;
		padding: 0.5rem 0;
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
				font-weight: 300;
			}
			.username {
				font-size: 0.8rem;
				color: $text-light;
				font-weight: 900;
			}

			&:not(:last-child) {
				border-bottom: solid thin $border-color-light;
			}
		}
	}
}
</style>
