<template>
	<div class="page room">
		<div class="page__loading" v-if="roomState.loading">
			<div class="page__loading-content">
				<div class="spinner"></div>
				<div>Connecting...</div>
			</div>
		</div>
		<div class="page__loading error" v-if="roomState.error">
			<div class="page__loading-content">
				<h3>This room doesn't exists, go back to make a new one</h3>
			</div>
		</div>

		<div class="page__header">
			<h1 class="mb-10">{{roomState.room.name}}</h1>
		</div>
		<div class="page__body">
			<div class="card"></div>
		</div>
	</div>
</template>

<script>
import { onMounted } from 'vue'
import router from '@/router'
import { joinRoom, roomState } from '@/services/SocketService'

export default {
	name: 'room-page',
	setup() {
		onMounted(() => {
			let currentRoute = router.currentRoute.value
			let roomid = currentRoute.params.id

			if (!roomState.connected) {
				// joinRoom(roomid)
			}
		})

		return {
			roomState,
		}
	},
}
</script>

<style lang="scss" scoped>
.page {
	padding: 3rem;
	opacity: 1;

	&__loading {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: fade-out(white, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 999;

		&.error {
			background-color: fade-out(white, 0.1);
		}

		&-content {
			display: flex;
			align-items: center;

			.spinner {
				margin-right: 1rem;
			}
		}
	}
	&__header {
		margin-bottom: 3rem;
		text-align: center;
	}
}
</style>