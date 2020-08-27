<template>
	<div class="page" v-if="socketState.loading">
		<div class="page__container">
			<h1>Connecting...</h1>
		</div>
	</div>
	<div class="page home" v-else>
		<div class="page__header"></div>

		<div class="page__body">
			<div class="players">
				<h4 class="mb-2">Players Online</h4>
				<ul class="mb-3">
					<li v-for="(player, i) in socketState.players" :key="i">
						<span>{{player}}</span>
					</li>
				</ul>
			</div>

			<!-- <hr />

			<div class="room-list">
				<h4 class="mb-2">Room List</h4>
				<ul>
					<li v-for="(room, key, i) in socketState.rooms" :key="i">
						<span class="mr-5">{{room}}</span>
						<button v-if="room.id !== $store.getters['userid']" @click="joinRoom(room)">JOIN</button>
					</li>
				</ul>
			</div>

			<hr />
			<div class="room-creator">
				<form @submit.prevent="createRoom">
					<input class="input mr-3" placeholder="Set roomname" type="text" />
					<button class="btn btn-primary" type="submit">Host Room</button>
				</form>
			</div>-->
		</div>
	</div>
</template>

<script>
import useSocket from '@/composition/Socket'
import { onMounted, onBeforeUnmount } from 'vue'

export default {
	name: 'Home',
	setup() {
		onMounted(() => {
			useSocket.connect()
		})
		onBeforeUnmount(() => {
			useSocket.disconnect()
		})
		return {
			...useSocket,
		}
	},
}
</script>
``
<style lang="scss" scoped>
.page {
	padding: 3rem;

	&__header {
		margin-bottom: 3rem;
	}
}
</style>
