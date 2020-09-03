<script>
export default {
	name: 'icon',
	props: ['src', 'alt', 'size'],
	computed: {
		style() {
			if (this.size) {
				return {
					width: `${this.size}px`,
					height: `${this.size}px`,
					color: 'red',
					borderRadius: '0px',
				}
			} else {
				return {}
			}
		},
	},
}
</script>

<template>
	<img :src="require(`@/assets/icons/${src}.svg`)" :alt="alt || src" :style="style" v-bind="$attrs" />
</template>
