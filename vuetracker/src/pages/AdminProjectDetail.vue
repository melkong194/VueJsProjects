<template>
    <main class="container">
		<div class="panel panel-info col-xl-12" v-if="getProjectById(this.id)"> 
			<div class="panel-heading justify-content-between row">
				<div class="project-name-w col-md-9">
					<h1 class="panel-title"><span class="project-name ml-4">{{getProjectById(this.id).name}}</span></h1>
				</div>	

				<div class="project-control-board justify-content-end col-md-2">
					<button class="btn btn-primary btn-project-control">
						<router-link 
							tag="div"
							exactActiveClass=""
							activeClass=""
							v-bind:to="{name:'admin-chat-message', params: {id:this.id}}"
						><i class="fas fa-comment-dots"></i></router-link></button>
					<button class="btn btn-warning btn-project-control">
						<router-link 
							tag="div"
							exactActiveClass=""
							activeClass=""
							v-bind:to="{name:'admin-project-edit', params: {id:this.id}}"
						><i class="fas fa-edit"></i></router-link></button>
					<button class="btn btn-danger btn-project-control" 
							v-if="getProjectById(this.id).status == 3"
							v-on:click.prevent="handleDelete"
						><i class="fas fa-trash-alt"></i></button>
				</div>
			</div> 
			
			<div class="panel-body">
				<div class="project-create-board m-4">
					<form class="row">							
						<div class="form-group col-md-12">
							<label for="exampleInputEmail1">Description and Requirements</label>
							<p>{{getProjectById(this.id).description}}
							</p>
						</div>

						<div class="form-group col-md-6">
							<label for="exampleInputEmail1">Project Start</label>
							<p>{{dateFormat(getProjectById(this.id).time_start)}}</p>
						</div>

						<div class="form-group col-md-6">
							<label for="exampleInputEmail1">Project Deadline</label>
							<p>{{dateFormat(getProjectById(this.id).time_end)}}</p>
						</div>

						<div class="form-group col-md-6" v-if="getProjectById(this.id).status==1">
							<label for="exampleInputEmail1">Project Status</label>
							<p><span class="badge badge-success">{{HASH_STATUS_CONFIG[getProjectById(this.id).status]}}</span></p>
						</div>
						<div class="form-group col-md-6" v-if="getProjectById(this.id).status==2">
							<label for="exampleInputEmail1">Project Status</label>
							<p><span class="badge badge-warning">{{HASH_STATUS_CONFIG[getProjectById(this.id).status]}}</span></p>
						</div>
						<div class="form-group col-md-6" v-if="getProjectById(this.id).status==3">
							<label for="exampleInputEmail1">Project Status</label>
							<p><span class="badge badge-secondary">{{HASH_STATUS_CONFIG[getProjectById(this.id).status]}}</span></p>
						</div>	

						<div class="form-group col-md-6">
							<label for="exampleInputEmail1">Assigned Member</label>
							<p>{{this.getEmaiMember}}</p>
						</div>

						
						<div class="form-group col-md-6">
							<label for="exampleInputEmail1"
								>Period Hour Worked</label
							>
							<p>{{this.hasPeriodHour()}}</p>
						</div>

						<div class="form-group col-md-6">
							<label for="exampleInputEmail1">Project Hours worked</label>
							<p>{{workHourFormat(getProjectById(this.id).totalHours)}}</p>
						</div>							
					</form>

					<div class="panel panel-success" v-if="getCheckinsById(this.id)">
						<div class="panel-heading">Period Time: </div>
						<table class="table table-hover ">
							<thead>
								<tr>
									<th style="width: 10%">Date</th>
									<th style="width: 10%" class="text-center">Time in</th>
									<th style="width: 10%">Date out</th>
									<th style="width: 15%">Hours</th>
									<th >Tasks have done</th>
									<th style="width: 17%">Checkin at</th>
								</tr>
							</thead>
			
							<tbody v-for="item in getCheckinsById(this.id)"
								v-bind:key="item.id">
								<tr>
									<td class="text-center"><span class="badge badge-info">{{dateFormat(item.date,"WeekdayDate")}}</span></td>
									<td>{{dateFormat(item.time_in,"Time")}}</td>
									<td>{{dateFormat(item.time_out,"Time")}}</td>
									<td><span class="badge badge-default">{{duration(item.time_in,item.time_out)}}</span></td>
									<td>{{item.doneTasks}}</td>
									<td>{{dateFormat(item.chkTime)}}</td>
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
import { mapActions, mapGetters } from 'vuex';
import { dateFormat, duration, workHourFormat } from "../helpers";
import { HASH_STATUS_CONFIG } from '../config/const'
import { projectRef } from '../config/database'
export default{
    name: 'admin-project-detail',
    data(){
        return {
			id: this.$route.params.id,
			member: "",
			requestBtnShow: true,
			HASH_STATUS_CONFIG,
			dateFormat,
			workHourFormat,

			duration
        }
    },
    watch: {
        '$route'(newRoute, oldRoute) {
            this.id = newRoute.params.id;
        }
    },
	methods: {
        ...mapActions(['getUserById']),
		handleDelete(){
			projectRef.child(this.id).remove()
			this.$router.push('/admin');
		},
		hasPeriodHour(){
			if(this.getLastRecordById(this.id)){
				// if(this.getLastRecordById(this.id).end >= new Date().toISOString()){
					return this.workHourFormat(this.getLastRecordById(this.id).periodHours);
				// }
			}
			return "0 hour 0 minute";
		}
    },
	computed: {
		...mapGetters(["getCheckinsById","getProjectById","getLastRecordById"]),
		getEmaiMember(){
			if(this.getProjectById(this.id)){
				this.getUserById(this.getProjectById(this.id).member).then(resp => {
					this.member = resp.user.email;
				})
				return this.member;
			}else{
				return "";
			}
		},
		isInProcess(){
			if(getProjectById(this.id)){
				if(getProjectById(this.id).status!==1) return true;
				return false
			}else{
				return false;
			}
		}
	}
}

</script>

<style>

</style>