<template>
	<div class="dialog">
		<div class="dialog-content" :style="`width: ${width}px`">
			<slot />
		</div>
	</div>
</template>

<script>
export default {
	name: 'dialog',
	props: {
		width: {
			type: String,
			default: '400',
		},
	},
}
</script>

<style>
.dialog {
	position: fixed; /* Stay in place */
	z-index: 1; /* Sit on top */
	left: 0;
	top: 0;
	width: 100%; /* Full width */
	height: 100%; /* Full height */
	overflow: auto; /* Enable scroll if needed */
	background-color: rgb(0, 0, 0); /* Fallback color */
	background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}
.dialog-content {
	background-color: #fff;
	margin: 15% auto; /* 15% from the top and centered */
	padding: 20px;
	border: 1px solid #888;
	border-radius: 0.5rem;
}
</style>