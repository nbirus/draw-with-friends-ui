<template>
	<transition name="modal">
		<div class="modal-mask" v-show="$contactDialog" @click.self="$contactDialog = false">
			<transition name="popover" mode="out-in">
				<div class="modal">
					<div class="modal__container">
						<div class="modal__header">
							<h3 class="text mb-3">Share link</h3>
							<button
								class="btn btn-icon-circle flat nb close"
								@click="$contactDialog = false"
								title="Close Share"
							>
								<i class="material-icons">close</i>
							</button>
						</div>
						<div class="modal__body"></div>
					</div>
				</div>
			</transition>
		</div>
	</transition>
</template>

<script>
export default {
	name: 'room-share-dialog',
}
</script>

<style lang="scss" scoped>
@import '@/styles/component';

.modal {
	&__container {
		width: 500px;
		padding: 3rem 3rem;
	}
	&__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 1rem;

		.btn {
			color: var(--c-grey5);

			&:hover {
				color: var(--c-grey8);
			}
		}
	}
	input,
	textarea {
		width: calc(100% - 2rem);
	}
}
.close {
	transform: translateY(-0.9rem) translateX(1.15rem) scale(0.9);
}
.contact .container {
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	width: 100%;

	.input-field {
		position: relative;
		margin-bottom: 2rem;
	}
	.bottom {
		display: flex;
	}
	.submit {
		width: 100%;
		justify-content: center;
		position: relative;

		i {
			margin-right: 0.65rem;
		}
	}
}
#contact-submit {
	width: calc(100% - 0.5rem);
	display: flex;
	align-items: center;
	justify-content: center;

	img {
		margin-right: 0.5rem;
	}
}

// transition
.modal-enter {
	opacity: 0;
}
.modal-leave-active {
	opacity: 0;
}
.modal-enter .modal-container,
.modal-leave-active .modal-container {
	transform: scale(0.8);
}

@media only screen and (max-width: 768px) {
	.modal {
		width: calc(100% - 1rem);

		&__container {
			width: 100%;
			padding: 2rem;
			font-size: 0.9rem;
		}
	}
}
</style>
