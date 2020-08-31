<template>
	<div class="chat scroller" ref="chatEl">
		<ul class="chat__list">
			<li class="chat__list-item" v-for="(message, i) in messages" :key="i">
				<div class="username">{{message.username}}:</div>
				<div class="message" v-text="message.message"></div>
			</li>
		</ul>
	</div>
</template>

<script>
import { ref, watch, onMounted } from 'vue'
export default {
	name: 'chat',
	props: ['messages'],
	setup(props) {
		let chatEl = ref()

		onMounted(() => {
			gotoBottom(chatEl.value)
		})

		watch(
			() => props.messages,
			() => {
				gotoBottom(chatEl.value)
			}
		)

		return {
			chatEl,
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
.chat {
	&__list {
		margin: 0;
		padding: 0;

		&-item {
			padding: 0.75rem 1rem;

			.message {
				font-size: 0.9rem;
				display: inline;
				line-height: 1.2;
			}
			.username {
				font-size: 0.8rem;
				color: $text;
				font-weight: 900;
				display: inline;
				margin-right: 0.5rem;
			}

			&:not(:last-child) {
				border-bottom: solid thin $border-color-light;
			}
		}
	}
}
</style>