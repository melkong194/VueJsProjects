<template>
	<tr>
		<td class="text-center">{{index}}</td>
		<td>{{task.name}}</td>
		<td class="text-center">
			<span class="badge" v-bind:class="levelClass">{{level}}</span>
		</td>
		<td>
			<button 
				v-on:click="handleEdit"
				type="button" class="btn btn-info">Edit</button>
			<button 
				v-on:click="handleDelete"
				type="button" class="btn btn-danger">Delete</button>
		</td>
	</tr>
</template>

<script>
import levelData from '../mocks/levelData';
export default {
	name: "table_list_item",
	props: {
		task: { type: Object, default: null},
		index: Number
	},
	computed: {
		level(){
			return this.levelData[this.task.level].name;
		},
		levelClass(){
			return this.levelData[this.task.level].class;
		}
	},
	data() {
		return {levelData: levelData};
	},
	methods:{
		handleDelete(){
			if(confirm("Do you want to delete task: " + this.task.name)){
				this.$emit("handleDelete", this.task.id);
			}
		},
		handleEdit(){
			this.$emit("handleEdit", this.task);
		}
	}
};
</script>

<style>
</style>