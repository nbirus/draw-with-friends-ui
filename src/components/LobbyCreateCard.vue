<script>
export default {
	name: 'lobby-create-card',
}
</script>

<template>
	<div class="lobby-card card">
		<div class="lobby-card__header">
			<h5>Create room</h5>
		</div>
		<div class="lobby-card__body">
			<div class="input-group">
				<!-- <label for="room-name">Room name</label> -->
				<input id="room-name" class="input mr-3" placeholder="Choose a room name" type="text" />
			</div>
		</div>
		<div class="lobby-card__footer">
			<button class="btn btn-primary btn-block">Start</button>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.lobby-card {
	height: 340px;

	&__header {
		border-bottom: solid thin $border-color;
		padding: 1rem 0;
	}
	&__body {
		flex: 0 1 100%;
		padding: 1.5rem;
		margin: 0;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: stretch;

		.input-group {
			text-align: left;

			input {
				width: 100%;
			}
		}
	}
	&__footer {
		flex: 0 0 auto;
		padding: 1.5rem;
	}
}
</style>