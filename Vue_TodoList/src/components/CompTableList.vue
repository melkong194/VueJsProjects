<template>
    <div class="card panel-success">
			<div class="card-header">List Task</div>
			<table class="table table-hover ">
				<thead>
					<tr>
						<th style="width: 10%" class="text-center">#</th>
						<th>Task</th>
						<th style="width: 20%" class="text-center">Level</th>
						<th style="width: 160px">Action</th>
					</tr>
				</thead>

				<tbody v-if="listTask.length !== 0">
                    <table-list-item
						v-for="(task,index) in listTask" v-bind:key="task.id"
						v-bind:task="task"
						v-bind:index="index"
						v-on:handleDelete="handleDelete"
						v-on:handleEdit="handleEdit"
					/>
					
				</tbody>

				<tbody v-else>
                    <td colspan="4"><h3>No results found!</h3></td>
					
				</tbody>

			</table>
		</div>

</template>

<script>
import TableListItem from './TableListItem.vue';
export default{
	components: { TableListItem },
    name: 'comp_table_list',
	props:{ 
		listTask: {type: Array, default: []}
	},
    data(){
        return {
        }
    },
	methods: {
		handleDelete(dataID){
			this.$emit("handleDelete", dataID);
		},
		handleEdit(dataTask){
			this.$emit("handleEdit", dataTask);
		}
	}
}
</script>

<style>

</style>