<template>
	<div class="draw" id="app">
		<!-- page -->
		<transition name="page" mode="out-in">
			<div class="draw__content" :key="$route.name">
				<router-view />
			</div>
		</transition>

		<!-- toolbar -->
		<toolbar class="draw__toolbar" />

		<!-- dialogs -->
	</div>
</template>

<script>
import Toolbar from '@/views/Toolbar'
export default {
	name: 'app',
	components: {
		Toolbar,
	},
}
</script>

<style lang="scss">
.draw {
	&__content {
		z-index: 1;
		padding-bottom: 50px;
	}
	&__toolbar {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 50px;
		z-index: 3;
	}
}
</style>
