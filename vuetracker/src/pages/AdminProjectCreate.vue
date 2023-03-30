<template>
	<main class="container">
		<div class="panel panel-info col-xl-12">
			<div class="panel-body">
				<div class="project-create-board m-4">
					<div class="panel panel-success">
						<div class="d-none d-md-block">
							<div class="panel-title">Create a Project</div>
						</div>
						<div class="row">
							<div class="form-group col-md-12">
								<label for="exampleInputEmail1"
									>Project Name</label
								>
								<input
									type="text"
									class="form-control"
									placeholder="Enter Project Name"
									v-model.trim="name"
								/>
							</div>

							<div class="form-group col-md-12">
								<label for="exampleInputEmail1"
									>Description and Requirements</label
								>
								<textarea
									type="text"
									class="form-control"
									v-model.trim="description"
								></textarea>
							</div>

							<div class="form-group col-md-6">
								<label for="exampleInputEmail1">Start</label>
								<datetime
									type="datetime"
									v-model="time_start"
								></datetime>
							</div>

							<div class="form-group col-md-6">
								<label for="exampleInputEmail1">End</label>
								<datetime
									type="datetime"
									v-model="time_end"
								></datetime>
							</div>

							<div class="form-group col-md-6">
								<label for="exampleInputEmail1"
									>Assigned Members:</label
								>
								<select
									class="input-group input-select form-control"
									v-model="member"
								>
									<option value="0">--Select--</option>
									<option
										v-for="staff in getListStaffEmail"
										v-bind:key="staff.uid"
										v-bind:value="staff.uid"
									>
										{{ staff.email }}
									</option>
								</select>
							</div>

							<div class="form-group col-md-6">
								<label for="exampleInputEmail1"
									>Project State</label
								>
								<select
									class="input-group input-select form-control"
									v-model="status"
								>
									<option value="0">--Select--</option>
									<option
										v-for="el in STATUS_CONFIG"
										v-bind:key="el.value + el.text"
										v-bind:value="el.value"
									>
										{{ el.text }}
									</option>
								</select>
							</div>

							<div class="col-md-12 btn-submit-create">
								<button
									class="btn btn-info"
									v-on:click="handleCreateProject"
								>
									create project
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
import { STATUS_CONFIG } from "../config/const";
import { mapActions, mapGetters, mapState } from "vuex";

export default {
	name: "admin-project-create",
	data() {
		return {
			name: "",
			description: "",
			time_start: null,
			time_end: null,
			status: 0,
			member: 0,
			STATUS_CONFIG,
		};
	},
	methods: {
		...mapActions(["createProject"]),
		handleCreateProject() {
			if(this.isValidate()){
				let data = {
					name: this.name,
					description: this.description,
					time_start: this.time_start,
					time_end: this.time_end,
					status: this.status,
					member: this.member,
					creator: this.currentUser.uid,
					totalHours: [0,0]
				};
				this.createProject(data).then((resp) => {
					if (resp.isSuccess) {
						alert("Project created successfull!");
						this.$router.push({path:"/admin"}).catch(() => {});
					}
				});
			}else{
				alert("invalidate project data!!");
			}
		},
		isValidate(){
			if(this.time_end <= this.time_start) {
				return false;
			}
			if(this.time_end==null || this.time_start==null) {
				return false;
			}
			if(this.name=="" || this.description==""){
				return false;
			}
			if(this.status==0 || this.member==0){
				return false;
			}
			return true;
		}
	},
	computed: {
		...mapGetters(["getListStaffEmail"]),
		...mapState(["currentUser"]),
	},
};
</script>

<style>
</style>