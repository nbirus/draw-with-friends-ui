<template>
	<ul class="room-colors">
		<li
			v-for="(color, key) in colors"
			:key="key"
			:class="`color-${key} active-${key === value} disabled-${disabledColors.includes(key)}`"
			class="room-colors-color"
			tabindex="0"
			@click="$emit('input', key)"
		></li>
	</ul>
</template>

<script>
import colors from '@/assets/colors'

export default {
	name: 'room-colors',
	props: ['value', 'users'],
	data() {
		let keys = ['silver', 'grey', 'aqua', 'lime', 'green', 'navy']
		keys.forEach(color => {
			delete colors[color]
		})
		return {
			colors,
		}
	},
	computed: {
		disabledColors() {
			let disabledColors = []
			for (let user in this.users) {
				disabledColors.push(this.users[user].color)
			}
			return disabledColors
		},
	},
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.room-colors {
	margin: 0;
	padding: 0;
	display: grid;
	grid-template-columns: repeat(5, 30px);
	height: auto;
	grid-gap: 1.15rem;

	&-color {
		display: block;
		width: 30px;
		height: 30px;
		border-radius: 50%;
		cursor: pointer;
		transition: all 0.2s ease;
		transform: scale(1);

		&.active-true:after {
			content: '';
			background-color: white;
			width: 7px;
			height: 7px;
			border-radius: 50%;
			position: absolute;
			top: 12px;
			left: 12px;
		}
		&.disabled-true:not(.active-true) {
			opacity: 0.5;
			pointer-events: none;
		}
		&:focus {
			outline: none;
		}
	}
}
@each $color, $name in $colors {
	.color-#{$name} {
		background-color: $color;

		&.active-true {
			box-shadow: 0 0 0 5px lighten($color, 40);
		}
		&.disabled-true:not(.active-true) {
			background: repeating-linear-gradient(
				40deg,
				lighten($color, 35),
				lighten($color, 35) 7px,
				lighten($color, 40) 7px,
				lighten($color, 40) 14px
			);
		}
	}
}
</style>