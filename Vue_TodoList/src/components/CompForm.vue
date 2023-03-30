
<template>
	<b-col cols="12" lg="6">
		<form-add
			v-on:handleToggleForm="handleToggleForm"
			v-bind:isOpenForm="isOpenForm"
		/>

		<form
			action=""
			method="POST"
			class="form-inline justify-content-between"
			v-if="isOpenForm"
		>
			<div class="form-group">
				<label class="sr-only" for="">label</label>
				<input
					v-model.trim="taskName"
					type="text"
					class="form-control"
					placeholder="Task Name"
				/>
			</div>
			<div class="form-group">
				<label class="sr-only" for="">label</label>
				<select
					v-model="taskLevel"
					name="ds"
					class="form-control"
					required="required"
				>
					<option value="0">Small</option>
					<option value="1">Medium</option>
					<option value="2">High</option>
				</select>
			</div>

			<button 
				v-if="taskEditSelected===null"
				v-on:click="handleAdd"
				type="button" class="btn btn-primary">Submit</button>
			<button 
				v-else
				v-on:click="handleEdit"
				type="button" class="btn btn-primary">Update</button>
			<button
				v-on:click="handleCancel"
				type="button"
				class="btn btn-secondary"
			>
				Cancel
			</button>
		</form>
	</b-col>
</template>

<script>
import FormAdd from "./FormAdd.vue";
import {v4 as uuidv4 } from 'uuid';
export default {
	components: { FormAdd },
	name: "comp-form",
	props: {
		isOpenForm: { type: Boolean, default: false },
		taskEditSelected: {type: Object, default: null}
	},
	data() {
		return {
			taskName: '',
			taskLevel: 0
		};
	},
	watch:{
		taskEditSelected:function(newData, oldData){
				if(this.taskEditSelected!== null){
					this.taskName = this.taskEditSelected.name;
					this.taskLevel = this.taskEditSelected.level;
			}
		}
	},
	methods: {
		handleToggleForm() {
			this.$emit("handleToggleForm");
			this.resetForm();
		},
		handleCancel() {
			this.$emit("handleToggleForm");
			this.resetForm();
		},
		handleAdd(){
			if(this.isValidateForm){
				let data = {
					id : uuidv4(),
					name : this.taskName, 
					level  :parseInt(this.taskLevel)
				}
				this.$emit("handleAdd", data);
				this.handleCancel();				
			}else{
				alert("Invalid Name");	
			}

			this.resetForm;		
		},
		handleEdit(){
			if(this.isValidateForm){
				let data = {
					id : this.taskEditSelected.id,
					name : this.taskName, 
					level  :parseInt(this.taskLevel)
				}
				this.$emit("handleEditInput", data);
				this.handleCancel();				
			}else{
				alert("Invalid Name");	
			}
		},
		resetForm(){
			this.taskName = "";
			this.taskLevel = 0;
		},
		isValidateForm(){
			return !this.taskName==="";
		}
	},
}
</script>

<style>
</style>