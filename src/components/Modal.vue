<template>
	<div class="dialog" v-if="open" @click.self="$emit('close')">
		<div class="dialog-content card" :style="`width: ${width}px`">
			<slot />
		</div>
	</div>
</template>

<script>
export default {
	name: 'dialog',
	props: {
		open: Boolean,
		width: {
			type: String,
			default: '400',
		},
	},
}
</script>

<style>
.dialog {
	position: fixed;
	z-index: 1;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	overflow: auto;
	background-color: rgb(0, 0, 0);
	background-color: rgba(0, 0, 0, 0.4);
}
.dialog-content {
	background-color: #fff;
	margin: 35% auto;
	overflow: visible;
}
</style>
