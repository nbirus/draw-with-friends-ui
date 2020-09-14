<template>
	<div class="draw" id="app">
		<div class="draw__loading" v-if="socketState.loading">
			<div class="draw__loading-content">
				<div class="spinner"></div>
				<h3>Connecting...</h3>
			</div>
		</div>
		<div class="draw__loading error" v-else-if="socketState.error">
			<div class="draw__loading-content error">
				<i class="ri-cloud-off-line"></i>
				<h3>
					Couldn't connect, try
					<a href="javascript:window.location.href=window.location.href">refreshing</a> the page
				</h3>
			</div>
		</div>

		<!-- page -->
		<router-view v-slot="{ Component }">
			<!-- <transition name="page" mode="out-in"> -->
			<div class="draw__content" :key="$route.name + socketState.loading">
				<component :is="Component" />
			</div>
			<!-- </transition> -->
		</router-view>
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
		background-color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 999;

		&.error {
			background-color: fade-out(white, 0);
		}

		&-content {
			display: flex;
			align-items: center;

			&.error {
				flex-direction: column;

				a {
					color: black;
					text-decoration: underline;
				}
			}

			i {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 5rem;
				height: 5rem;
				font-size: 2rem;
				background-color: fade-out(black, 0.95);
				border-radius: 50%;
				margin-bottom: 1rem;
			}

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
