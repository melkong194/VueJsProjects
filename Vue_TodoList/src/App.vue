<template>
	<div id="app">
		<b-container>
			<comp-title />

			<b-row>
				<comp-control 
					v-on:handleSort="handleSort"
					v-bind:orderBy="orderBy"
					v-bind:orderDir="orderDir"
					v-bind:strSearch="strSearch"
					v-on:handleSearch="handleSearch"
				/>

				<comp-form 
					v-bind:isOpenForm="isOpenForm"
					v-on:handleToggleForm="handleToggleForm"
					v-on:handleAdd="handleAdd"
					v-bind:taskEditSelected="taskEditSelected"
					v-on:handleEditInput="handleEditInput"
				/>
			</b-row>

			<comp-table-list 
				v-bind:listTask="listTaskSort"
				v-on:handleDelete="handleDelete"
				v-on:handleEdit="handleEdit"
			/>

		</b-container>
	</div>
</template>

<script>
import CompControl from "./components/CompControl";
import CompForm from "./components/CompForm.vue";
import CompTableList from "./components/CompTableList.vue";
import CompTitle from "./components/CompTitle";

import listTask from './mocks/tasks';

export default {
	components: { CompTitle, CompControl, CompTableList, CompForm },
	name: "app",
	data() {
		return {
			listTask: null,
			isOpenForm: false,
			strSearch: '',
			orderBy: 'name',
			orderDir: 'asc',
			taskEditSelected: null
		};
	},
	computed:{
		listTaskSearch(){
			var searchedList = this.listTask.filter(item=>{
				return item.name.toLowerCase().includes(this.strSearch.toLowerCase());
			})
			return searchedList;
		},
		listTaskSort(){
			var list = [...this.listTaskSearch];
				list.sort(this.orderCompare);

			return list;
		}
	},
	created(){
		let tasks = localStorage.getItem('tasks');
		if(tasks !== null){
			this.listTask = JSON.parse(tasks);
		} else {
			this.listTask = [];
		}
	},
	watch:{
		listTask: function(newTasks){
			var str = JSON.stringify(newTasks);
				localStorage.setItem('tasks', str);
		}
	},
	methods: {
		handleToggleForm(){
			this.isOpenForm = !this.isOpenForm;	
			if(!this.isOpenForm) this.taskEditSelected = null;		
		},
		handleSearch(data){
			this.strSearch=data;
		},
		handleSort(data){
			this.orderBy = data.orderBy;
			this.orderDir = data.orderDir;
		},
		handleDelete(dataID){
			this.listTask = this.listTask.filter(item => item.id !==  dataID);
		},handleAdd(data){
			this.listTask.push(data);
		},
		handleEdit(dataTask){
			this.isOpenForm = true;
			this.taskEditSelected = dataTask;
		},
		handleEditInput(dataTask){
			let editPos = this.listTask.findIndex(item => item.id === this.taskEditSelected.id);
			if(editPos !== -1) this.listTask.splice(editPos,1,dataTask);
		},
		orderCompare(x,y){
			var dirSort = this.orderDir === 'asc'? - 1 : 1; 
			if(x[this.orderBy]  < y[this.orderBy]) return dirSort;
			else if (x[this.orderBy] > y[this.orderBy]) return dirSort*(-1);
			else return 0;
		}
	}
};
</script>

<style lang="scss">
* {
	box-sizing: border-box;
}

body {
	padding: 100px 0;
}
.table > tbody > tr > td,
.table > tbody > tr > th,
.table > tfoot > tr > td,
.table > tfoot > tr > th,
.table > thead > tr > td,
.table > thead > tr > th {
	vertical-align: middle;
}

.container > .row {
	margin-top: 20px;
	margin-bottom: 30px;
}

span.badge-medium {
	padding: 11px 10px;
	margin: 0px 8px;
	font-size: 16px;
	display: inline-block;
	vertical-align: top;
}

@media (max-width: 992px) {
	.add-task {
		margin-top: 50px;
	}
}
</style>
