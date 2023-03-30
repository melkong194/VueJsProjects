<template>
	<main class="container">
		<div class="panel panel-info col-xl-12">
			<div class="panel-body">
				<div class="project-create-board m-4">
					<div class="panel panel-success">
						<h5 class="panel-title">List of Assigned Projects</h5>
						<!-- #### Render TO VERIFY PROJECTS -->
						<table
							class="table table-hover"
							v-for="item in getListProjectFilter.toVerify"
							v-bind:key="item.id"
						>
							<thead v-if="item.member == currentUser.uid">
								<tr>
									<th colspan="1"  class="state-col-table">
										<span class="badge badge-warning"
											>Verifying</span
										>
									</th>
									<th colspan="3">
										<router-link
											exactActiveClass=""
											activeClass=""
											v-bind:to="{ name: 'staff-project-detail', params: {id:item.id}}"
										>{{ item.name }}</router-link>
									</th>
									<th colspan="1" class="text-right">	
										<i class="work-recording" v-if="haveNewMessage(item.id)">
											<router-link 
												tag="div"
												exactActiveClass=""
												activeClass=""
												v-bind:to="{name:'staff-chat-message', params: {id:item.id}}"
											>new message <i class="fas fa-comment-dots"></i>
											</router-link></i>

										<button class="btn btn-secondary btn-project-control">
											<router-link 
												tag="div"
												exactActiveClass=""
												activeClass=""
												v-bind:to="{name:'staff-reports', params: {id:item.id}}"
											>Report</router-link></button>
									</th>
								</tr>
							</thead>
						</table>
						<!-- #### Render IN PROCESS PROJECTS -->
						<table
							class="table table-hover"
							v-for="item in getListProjectFilter.inProcess"
							v-bind:key="item.id"
						>
							<thead v-if="item.member == currentUser.uid">
								<tr>
									<th colspan="1"  class="state-col-table">
										<span class="badge badge-success"
											>In process</span
										>
									</th>
									<th colspan="3">
										<router-link
											exactActiveClass=""
											activeClass=""
											v-bind:to="{ name: 'staff-project-detail', params: {id:item.id}}"
										>{{ item.name }}</router-link>
									</th>
									<th colspan="1" class="text-right">
										<i class="work-recording" v-if="haveNewMessage(item.id)">
											<router-link 
												tag="div"
												exactActiveClass=""
												activeClass=""
												v-bind:to="{name:'staff-chat-message', params: {id:item.id}}"
											>new message <i class="fas fa-comment-dots"></i>
											</router-link></i>

										<button class="btn btn-secondary btn-project-control">
											<router-link 
												tag="div"
												exactActiveClass=""
												activeClass=""
												v-bind:to="{name:'staff-reports', params: {id:item.id}}"
											>Report</router-link></button>
									</th>
								</tr>
							</thead>
						</table>
						<!-- #### Render COMPLETE PROJECTS -->
						<table
							class="table table-hover"
							v-for="item in getListProjectFilter.complete"
							v-bind:key="item.id"
						>
							<thead v-if="item.member == currentUser.uid">
								<tr>
									<th colspan="1"  class="state-col-table">
										<span class="badge badge-secondary"
											>Complete</span
										>
									</th>
									<th colspan="3">
										<router-link
											exactActiveClass=""
											activeClass=""
											v-bind:to="{ name: 'staff-project-detail', params: {id:item.id}}"
										>{{ item.name }}</router-link>
									</th>
									<th colspan="1" class="text-right">	
										<i class="work-recording" v-if="haveNewMessage(item.id)">
											<router-link 
												tag="div"
												exactActiveClass=""
												activeClass=""
												v-bind:to="{name:'staff-chat-message', params: {id:item.id}}"
											>new message <i class="fas fa-comment-dots"></i>
											</router-link></i>

										<button class="btn btn-secondary btn-project-control">
											<router-link 
												tag="div"
												exactActiveClass=""
												activeClass=""
												v-bind:to="{name:'staff-reports', params: {id:item.id}}"
											>Report</router-link></button>
									</th>
								</tr>
							</thead>
						</table>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
	name: "staff-project-list",
	data() {
		return {};
	},
	computed: {
		...mapGetters(["getListProjectFilter", "getLastMessageById"]),
		...mapState(["currentUser"]),
	},
	methods:{
		haveNewMessage(id){
			if(this.getLastMessageById(id)){
				if(this.getLastMessageById(id).sender !== this.currentUser.uid){
					return true;
				}
			}
			return false
		}
	}
};
</script>

<style>
</style>