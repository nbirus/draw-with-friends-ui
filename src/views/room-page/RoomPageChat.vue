<script>
import { computed } from 'vue'
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
</script>

<template>
	<div class="chat scroller">
		<ul class="chat__list scroller">
			<li
				class="chat__list-item"
				v-for="(message, i) in reversedMessages"
				:key="i"
				:class="[message.event ? 'event' : 'message', get(roomState, `room.users.${message.userid}.color`, 'empty')]"
			>
				<!-- event -->
				<div
					v-if="message.event"
					class="chat__list-event"
					:class="[message.event, get(roomState, `room.users.${message.userid}.ready`) ? 'ready-active' : '']"
				>
					<i v-if="message.event === 'join'" class="ri-arrow-right-line"></i>
					<i v-if="message.event === 'leave'" class="ri-close-line"></i>
					<i v-if="message.event === 'ready'" class="ri-check-line"></i>
					<i v-if="message.event === 'countdown'" class="ri-timer-line"></i>
					<i v-if="message.event === 'countdown-cancel'" class="ri-close-circle-line"></i>
					<div class="username" v-text="message.user.username"></div>
					<div class="message">
						<span v-if="message.event === 'join'">joined the room</span>
						<span v-else-if="message.event === 'leave'">left the room</span>
						<span v-else-if="message.event === 'ready'">is ready...</span>
						<span v-else-if="message.event === 'countdown-cancel'">stopped the countdown</span>
						<span v-else-if="message.event === 'countdown'">Game starts in {{ message.message }}...</span>
					</div>
				</div>

				<!-- message -->
				<div v-else class="chat__list-message">
					<div class="username" v-text="`${message.user.username}:`"></div>
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
	// height: 400px;

	&__list {
		height: 100%;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column-reverse;
		justify-content: flex-start;
		overflow-y: auto;
		font-size: 0.85rem;

		&-item {
			flex: 0 0 auto;

			&:last-child {
				padding-top: 1rem !important;
			}
			&:first-child {
				margin-bottom: 0.25rem;
			}
			&.empty {
				opacity: 0.5;
			}
			@each $color, $name in $colors {
				&.#{$name} .username {
					color: $color;
				}
				&.#{$name} {
					i {
						color: $color;
						background-color: fade-out($color, 0.95);
					}
					.ready.ready-active {
						background: repeating-linear-gradient(
							45deg,
							fade-out($color, 0.935),
							fade-out($color, 0.935) 2rem,
							fade-out($color, 0.975) 2rem,
							fade-out($color, 0.975) 4rem
						);
						background-size: 200% 200%;
						animation: barberpole 25s linear infinite;

						i {
							background-color: fade-out($color, 0.9);
						}
					}
				}
			}
		}
		&-event {
			flex: 0 0 auto;
			margin: 0 0 0.75rem;
			padding: 0 0.5rem;
			position: relative;
			display: flex;
			align-items: center;

			i {
				font-size: 1em;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-right: 0.5rem;
				background-color: fade-out($text, 0.95);
				border-radius: 50%;
				padding: 0.15rem;
				height: 18px;
				width: 18px;
			}

			&.join {
				margin-top: 0.25rem;
			}
			&.ready {
				padding: 0.5rem;
				margin: 0 0 0.75rem;

				i {
					height: 18px;
					width: 18px;
				}
				.message {
					color: fade-out($text, 0.25);
				}
			}
			&.countdown {
				padding: 0 0.5rem;

				.username,
				i {
					display: none;
				}
				.message {
					font-size: 0.9em;
					color: lighten($text, 20);
				}
			}
			&.countdown-cancel {
				padding: 0 0.5rem;

				i {
					display: none;
				}
				.message {
					transform: translateY(1px);
				}
			}
		}
		&-message {
			display: flex;
			align-items: flex-start;
			margin: 0 0 0.5rem;
			padding: 0 1rem 0 1rem;
		}

		.username {
			flex: 0 0 auto;
			color: $text;
			font-weight: 900;
			display: inline;
			margin-right: 0.35em;
		}
		.message {
			display: inline;
			color: lighten($text, 15);
			white-space: wrap;
			overflow: hidden;
			text-overflow: ellipsis;
			line-height: 1.2;
		}
	}
}

@keyframes barberpole {
	100% {
		background-position: 100% 100%;
	}
}
</style>
