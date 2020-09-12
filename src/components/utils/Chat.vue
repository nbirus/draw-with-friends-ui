

<script>
import { ref, watch, computed } from 'vue'
import { roomState } from '@/composition/Room'
import { userState } from '@/composition/User'
import { cloneDeep, get } from 'lodash'

export default {
	name: 'chat',
	props: ['messages'],
	setup(props) {
		let reversedMessages = computed(() => {
			let newMessages = cloneDeep(props.messages)
			if (newMessages) {
				newMessages.reverse()
			}
			return newMessages
		})

		return {
			reversedMessages,
			roomState,
			userState,
			get,
		}
	},
}

function gotoBottom(element) {
	if (element) {
		element.scrollTop = element.scrollHeight - element.clientHeight
	}
}
</script>

<template>
	<div class="chat">
		<ul class="chat__list scroller">
			<li
				class="chat__list-item"
				v-for="(message, i) in reversedMessages"
				:key="i"
				:class="[message.event ? 'event' : 'message', get(roomState, `room.users.${message.userid}.color`, 'empty')]"
			>
				<!-- event -->
				<div v-if="message.event" class="chat__list-event" :class="message.event">
					<div class="username" v-text="message.user.username"></div>
					<div class="message">
						<span v-if="message.event === 'join'">joined the room</span>
						<span v-else-if="message.event === 'leave'">left the room</span>
						<span v-else-if="message.event === 'ready'">is ready</span>
					</div>
					<i v-if="message.event === 'join'" class="ri-arrow-right-line"></i>
					<i v-if="message.event === 'leave'" class="ri-close-line"></i>
					<i v-if="message.event === 'ready'" class="ri-check-line"></i>
				</div>

				<!-- message -->
				<div v-else class="chat__list-message">
					<div class="username" v-text="message.user.username"></div>
					<div class="message" v-text="message.message"></div>
				</div>
			</li>
		</ul>
	</div>
</template>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.chat {
	overflow-y: auto;

	&__list {
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column-reverse;
		justify-content: flex-start;
		height: 100%;
		overflow-y: auto;

		&-item {
			&:first-child {
				margin-bottom: 1rem;
			}
			&.empty {
				opacity: 0.75;
			}
			@each $color, $name in $colors {
				&.#{$name} .username {
					color: $color;
				}
			}
		}
		&-event {
			padding: 0.75rem 1rem 0.75rem 3rem;
			margin: 0.5rem 0 0;
			font-size: 1rem;
			position: relative;
			display: flex;
			align-items: center;
			border-bottom: solid thin lighten($border-color-light, 40);
			border-top: solid thin lighten($border-color-light, 40);
			background: repeating-linear-gradient(
				45deg,
				lighten($light, 0),
				lighten($light, 0) 2rem,
				darken($light, 2) 2rem,
				darken($light, 2) 4rem
			);
			background-size: 200% 200%;
			animation: barberpole 25s linear infinite;

			i {
				position: absolute;
				left: 1rem;
				top: 0.75rem;
				font-size: 1.1rem;
			}

			&.ready {
				background: repeating-linear-gradient(
					45deg,
					fade-out($green, 0.9),
					fade-out($green, 0.9) 2rem,
					fade-out($green, 0.95) 2rem,
					fade-out($green, 0.95) 4rem
				);

				.username,
				i {
					color: darken($green, 25);
				}
			}
		}
		&-message {
			display: flex;
			align-items: center;
			padding: 0 1rem;
			margin: 1rem 0 0;
		}
		.username {
			font-size: 0.9em;
			color: $text;
			font-weight: 900;
			display: inline;
			margin-right: 0.35em;
		}
		.message {
			font-size: 0.9em;
			display: inline;
			color: lighten($text, 15);
		}
	}
}

.event + .message {
	margin-bottom: 0.35rem;
}

@keyframes barberpole {
	100% {
		background-position: 100% 100%;
	}
}
</style>