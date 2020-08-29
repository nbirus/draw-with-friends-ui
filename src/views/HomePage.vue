<template>
	<div class="page home">
		<div class="page__header">
			<h1 class="mb-10">Join or create a game</h1>
		</div>

		<div class="page__body">
			<transition-group name="list" tag="ul" mode="out-in" class="room-list" appear>
				<li class="room-list__item" key="create">
					<lobby-create-card class="room-list__card" />
				</li>
				<li
					class="room-list__item"
					v-for="(room, key, i) in $store.getters['game/rooms']"
					:key="i"
					:class="`delay-${i}`"
				>
					<lobby-card class="room-list__card" v-bind="room"></lobby-card>
				</li>
			</transition-group>

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
	opacity: 1;

	&__header {
		margin-bottom: 3rem;
		text-align: center;

		a {
			position: absolute;
			left: 4.5rem;
		}
	}
	&__body {
		margin: 0 auto;
		max-width: 900px;
	}
}
.room-list {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-gap: 2rem;
}
</style>
