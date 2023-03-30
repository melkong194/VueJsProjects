<template>
	<main class="container">
		<div class="panel panel-info col-xl-12">
			<div class="panel-body">
				<div class="project-create-board m-4">
					<div class="panel panel-success">
						<div class="d-none d-md-block">
							<div class="panel-title">Update a Project</div>
						</div>
						<form class="row">
							<div class="form-group col-md-12">
								<label for="exampleInputEmail1"
									>Project Name</label
								>
								<input
									type="text"
									class="form-control"
									placeholder="Enter Project Name"
									v-model="project.name"
								/>
							</div>

							<div class="form-group col-md-12">
								<label for="exampleInputEmail1"
									>Description and Requirements</label
								>
								<textarea
									type="text"
									class="form-control"
									v-model="project.description"
								></textarea>
							</div>

							<div class="form-group col-md-6">
								<label for="exampleInputEmail1">Start</label>
								<datetime
									type="datetime"
									v-model="project.time_start"
								></datetime>
							</div>

							<div class="form-group col-md-6">
								<label for="exampleInputEmail1">End</label>
								<datetime
									type="datetime"
									v-model="project.time_end"
								></datetime>
							</div>

							<div class="form-group col-md-6">
								<label for="exampleInputEmail1"
									>Assigned Members:</label
								>
								<select
									class="input-group input-select form-control"
									v-model="project.member"
								>
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
									v-model="project.status"
								>
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
									type="submit"
									v-on:click.prevent="handleUpdate"
								>
									Update project
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<script>
import { STATUS_CONFIG } from "../config/const";
import { mapActions, mapGetters } from 'vuex';

export default{
    name: 'admin-project-edit',
    data(){
        return {
            id: this.$route.params.id,
            STATUS_CONFIG,
            project:{
				name: "",
				description: "",
				time_start: null,
				time_end: null,
				status: 0,
				member: ""
			}
        }
    },
    watch: {
        '$route'(newRoute, oldRoute) {
            this.id = newRoute.params.id;
			this.fetchDataProject();
        }
    },
    created() {
        this.fetchDataProject();
    },
    methods: {
        ...mapActions(['getUserById', 'updateProject']),
        fetchDataProject() {
            // this.getProjectById(this.id).then(resp => {
            //     if(resp.isSuccess) {
            //         this.project = resp.project;
            //     } else {
            //         this.$router.push('/')
            //     }
            // })
			if(this.getProjectById(this.id)){
				this.project = this.getProjectById(this.id);
			}
			
        },
        handleUpdate() {
				let data={
					id:this.id,
					project: this.project
				} 
				this.updateProject(data).then(resp=>{
					if(resp.isSuccess){
						alert("Project is updated!");
            			this.$router.push('/admin/projectDetail/'+this.id);
					}
				})
        }
    },
	computed: {
		...mapGetters(["getListStaffEmail","getProjectById"])
	}
}
</script>

<style>

</style>