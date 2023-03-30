<template>
	<div class="form-group add-task">
		<button
			v-if="!isOpenForm"
			v-on:click="onClickAddSubmit"
			type="button"
			class="btn btn-info btn-block"
		>
			Add New Task
		</button>

		<button
			v-else
			v-on:click="onClickAddSubmit"
			type="button"
			class="btn btn-danger btn-block"
		>
			Close
		</button>
	</div>
</template>

<script>
export default {
	name: "form-add",
	props:{
		isOpenForm: Boolean
	},
	data() {
		return {};
	},
	methods: {
		onClickAddSubmit() {
			this.$emit("handleToggleForm");
		}
	},
};
</script>

<style>
</style>