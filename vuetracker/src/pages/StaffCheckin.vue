<template>
	<main class="container">
		<div class="panel panel-info col-xl-12">
			<div class="panel-body">
				<div class="project-create-board m-4">
					<div class="panel panel-success">
						<div class="d-none d-md-block">
							<div class="panel-title">Work Check-in</div>
						</div>

						<div class="row">
							<div class="form-group col-md-12">
								<label for="exampleInputEmail1">Date</label>
								<datetime type="date" v-model="date"></datetime>
							</div>

							<div class="form-group col-md-6">
								<label for="exampleInputEmail1">Time in</label>
								<datetime
									type="time"
									v-model="time_in"
								></datetime>
							</div>

							<div class="form-group col-md-6">
								<label for="exampleInputEmail1">Time out</label>
								<datetime
									type="time"
									v-model="time_out"
								></datetime>
							</div>

							<div class="form-group col-md-12">
								<label for="exampleInputEmail1"
									>Tasks have done:</label
								>
								<textarea
									type="text"
									class="form-control mk-area-done"
									placeholder="List of tasks you have worked on"
									v-model.trim="doneTasks"
								></textarea>
							</div>

							<div class="col-md-12 btn-submit-create">
								<button class="btn btn-info" v-on:click="hanldSubmitCheckin">
									submit report
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { getWorkHourDataType, plus2workHours, endPeriodDate, startPeriodDate } from "../helpers";
export default {
	name: "staff-checkin",
	data() {
		return {
			id: this.$route.params.id,
			date: null,
			time_in: null,
			time_out: null,
			doneTasks: null,
			getWorkHourDataType,
			plus2workHours,
			endPeriodDate,
			startPeriodDate
		};
	},
	methods: {
		...mapActions(['checkinOfProject','updateHours', 'setNewRecord', 'updateRecord']),
		hanldSubmitCheckin(){
			if(this.isValidate()){
				let data = {
					id: this.id,
					date: this.date,
					time_in: this.time_in,
					time_out: this.time_out,
					doneTasks: this.doneTasks
				}
				this.checkinOfProject(data).then((resp) => {
					if (resp.isSuccess) {
						this.updateProjectHours();
						alert("Checkin successfully!");
						this.$router.push({path:"/staff/projectDetail/"+this.id}).catch(() => {});
					}
				});
			}else{
				alert("invalidate project data!!");
			}
		},
		isValidate(){
			if(this.time_out <= this.time_in) {
				return false;
			}
			if(this.time_out==null || this.time_in==null || this.date==null) {
				return false;
			}
			if(this.date > new Date().toISOString()){
				return false;
			}
			if(this.doneTasks=="") {
				return false;
			}
			return true;
		},
		updateProjectHours(){
			var totalHour = this.getProjectById(this.id).totalHours;
			var checkinHour = getWorkHourDataType(this.time_in,this.time_out);
			let data = {
				totalHours: plus2workHours(totalHour, checkinHour)
			}
			this.updateHours({id:this.id,data}).then(resp=>{})
						
			if(this.getLastRecordById(this.id)){
				var record = this.getLastRecordById(this.id);
				if(new Date().toISOString() >= record.end){
					let startTime = this.startPeriodDate(record.end); 
					let data = {
						period: record.period + 1,
						start: startTime,
						end: this.endPeriodDate(startTime),
						periodHours: checkinHour
					}
					this.setNewRecord({projId:this.id, data}).then(resp=>{})
				}else {
					data = {
						period: record.period,
						periodHours: plus2workHours(record.periodHours, checkinHour)
					}
					this.updateRecord({projId:this.id, data}).then(resp=>{})
				}
			}else{
				let startTime = this.getProjectById(this.id).time_start;
				let data ={
					period: 1,
					start: startTime,
					end: this.endPeriodDate(startTime),
					periodHours: checkinHour
				}
				this.setNewRecord({projId:this.id, data}).then(resp=>{})
			}
		}
	},
	computed: {
		...mapGetters(['getProjectById', 'getRecordById', 'getLastRecordById'])
	}

};
</script>

<style>
</style>