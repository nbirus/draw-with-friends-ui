
<script>
import { ref } from 'vue'
import { createRoom } from '@/services/SocketService'

export default {
	name: 'room-create-card',
	setup() {
		const roomName = ref('')

		function onSubmit() {
			createRoom({
				name: roomName.value,
			})
		}
		return {
			roomName,
			onSubmit,
		}
	},
}
</script>

<template>
	<form @submit.prevent="onSubmit" class="room-card card">
		<div class="room-card__header">
			<h5>Create room</h5>
		</div>
		<div class="room-card__body">
			<div class="input-group">
				<input
					required
					v-model="roomName"
					id="room-name"
					class="input mr-3"
					placeholder="Room name"
					autocomplete="off"
					type="text"
				/>
			</div>
			<div class="input-group">
				<!-- <option
					v-for="(hex, color, i) in $store.getters['game/colors']"
					:key="i"
					:value="color"
				>{{color}}</option>-->
			</div>
		</div>
		<div class="room-card__footer">
			<button class="btn btn-primary btn-block" type="submit">Start</button>
		</div>
	</form>
</template>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.room-card {
	height: 340px;

	&__header {
		border-bottom: solid thin $border-color-light;
		padding: 1rem 0;
		text-align: center;
	}
	&__body {
		flex: 0 1 100%;
		padding: 1.5rem;
		padding-bottom: 0;
		margin: 0;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: stretch;

		.input-group {
			text-align: left;
			margin-bottom: 0.5rem;

			input,
			select {
				width: 100%;
			}
		}
	}
	&__footer {
		flex: 0 0 auto;
		padding: 0 1.5rem 1.5rem;
	}
}
</style>