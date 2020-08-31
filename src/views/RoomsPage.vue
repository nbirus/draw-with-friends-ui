<template>
	<div class="page home">
		<div class="page__header">
			<h1 class="mb-10">Join or create a game</h1>
		</div>

		<div class="page__body">
			<transition-group name="list" tag="ul" mode="out-in" class="room-list" appear>
				<li class="room-list__item" key="create">
					<room-create-card class="room-list__card" />
				</li>
				<li class="room-list__item" v-for="(room, key, i) in rooms" :key="i" :class="`delay-${i}`">
					<room-card class="room-list__card" v-bind="room"></room-card>
				</li>
			</transition-group>
		</div>
	</div>
</template>

<script>
import RoomCard from '@/components/room/RoomCard'
import RoomCreateCard from '@/components/room/RoomCreateCard'
import { rooms } from '@/composition/Global'

export default {
	name: 'Home',
	components: { RoomCard, RoomCreateCard },
	setup() {
		return {
			rooms,
		}
	},
}
</script>

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

	&__item {
		min-width: 250px;
	}
}
</style>
