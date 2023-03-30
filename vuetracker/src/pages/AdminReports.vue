<template>
	<main class="container">
		<div class="panel panel-info col-xl-12">
			<div class="panel-body">
				<div class="project-create-board m-4">
					<div class="panel panel-success">
						<h5 class="panel-title">Report of Project: {{getProjectById(this.id).name}}</h5>	
						<table class="table table-hover ">
							<thead>
								<tr>
									<th colspan="1" v-if="getProjectById(this.id).status==1">
										<span class="badge badge-success">In Process</span></th>
									<th colspan="1" v-if="getProjectById(this.id).status==2">
										<span class="badge badge-warning">To Verify</span></th>
									<th colspan="1" v-if="getProjectById(this.id).status==3">
										<span class="badge badge-secondary">Complete</span></th>
									<th colspan="1"><a href="#">Start: {{dateFormat(getProjectById(this.id).time_start)}}</a></th>
									<th colspan="1"><a href="#">End: {{dateFormat(getProjectById(this.id).time_end)}}</a></th>
									<th colspan="2"><a href="#">Total Hours: {{workHourFormat(getProjectById(this.id).totalHours)}}</a></th>
								</tr>
							</thead>
							<thead>
								<tr>
									<th colspan="1">period</th>
									<th colspan="1">period start</th>
									<th colspan="1">period end</th>
									<th colspan="1">period hours</th>
									<th colspan="1">recorded</th>
								</tr>
							</thead>
							<tbody v-if="this.getRecordById(this.id)">
								<tr v-for="item in getRecordById(this.id)"
									v-bind:key="item.id">
									<td v-if="isCurrent(item.end)"><span class="badge badge-success">Period {{item.period}}</span></td>										
									<td v-else><span class="badge badge-secondary">Period {{item.period}}</span></td>
									<td>{{dateFormat(item.start)}}</td>
									<td>{{dateFormat(item.end)}}</td>
									<td>{{workHourFormat(item.periodHours)}}</td>
									<td><span class="badge badge-info"><a class="file-record" href="#">record.pdf</a></span></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<script>
import { mapGetters } from 'vuex'
import { dateFormat, workHourFormat } from "../helpers";
export default{
    name: 'admin-reports',
    data(){
		return {
			id: this.$route.params.id,
			dateFormat,
			workHourFormat
		}
	},
	watch: {
		$route(newRoute, oldRoute) {
			this.id = newRoute.params.id;
		},
	},
	computed: {
		...mapGetters(["getRecordById","getProjectById"]),
	},
	methods: {
		isCurrent(endDate){
			if(new Date().toISOString() < endDate) return true;
			else return false;
		}
	}
}
</script>

<style>

</style>