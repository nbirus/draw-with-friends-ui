<template>
	<div class="page" v-if="socketState.loading">
		<div class="page__container">
			<h1>Connecting...</h1>
		</div>
	</div>
	<div class="page home" v-else>
		<div class="page__header">
			<!-- <router-link class="btn btn-outline" to="/login">Change username</router-link> -->
			<h1 class="mb-10">Join or create a game</h1>
		</div>

		<div class="page__body">
			<ul class="room-list">
				<li class="room-list__item">
					<lobby-create-card class="room-list__card" />
				</li>
				<li class="room-list__item" v-for="(room, i) in $store.getters['game/rooms']" :key="i">
					<lobby-card class="room-list__card" v-bind="room"></lobby-card>
				</li>
			</ul>

			<!-- <div class="players">
				<h4 class="mb-2">Players Online</h4>
				<ul class="mb-3">
					<li v-for="(player, i) in socketState.players" :key="i">
						<span>{{player}}</span>
					</li>
				</ul>
			</div>-->

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
import LobbyCard from '@/components/LobbyCard'
import LobbyCreateCard from '@/components/LobbyCreateCard'
import useSocket from '@/composition/Socket'
import { onMounted, onBeforeUnmount } from 'vue'

export default {
	name: 'Home',
	components: { LobbyCard, LobbyCreateCard },
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

		a {
			position: absolute;
			left: 4.5rem;
		}
	}
}
.room-list {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-gap: 1rem 2rem;

	&__item {
		// grid-row: 1;
	}
}
</style>
