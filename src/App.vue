<template>
	<div class="draw" id="app">
		<div class="draw__loading" v-if="socketState.loading">
			<div class="draw__loading-content">
				<div class="spinner"></div>
				<div>Connecting...</div>
			</div>
		</div>
		<div class="draw__loading error" v-if="socketState.error">
			<div class="draw__loading-content">
				<h3>Couldn't connect, try refreshing the page</h3>
			</div>
		</div>

		<!-- page -->
		<router-view v-slot="{ Component }">
			<transition name="page" mode="out-in">
				<div class="draw__content" :key="$route.name">
					<component :is="Component" />
				</div>
			</transition>
		</router-view>

		<!-- dialogs -->
	</div>
</template>

<script>
import { onMounted, onBeforeUnmount, watch } from 'vue'
import { connect, disconnect, socketState } from '@/composition/Global'
import router from '@/router'

export default {
	name: 'app',
	setup() {
		onMounted(() => {
			connect()
		})
		onBeforeUnmount(() => {
			disconnect()
		})

		watch(
			() => socketState.error,
			() => {
				router.push('/')
			}
		)

		return {
			socketState,
		}
	},
}
</script>

<style lang="scss">
.draw {
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
	&__content {
		z-index: 1;
	}
}
</style>
