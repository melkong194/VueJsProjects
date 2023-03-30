<template>
	<div class="app">
		<div id="page-login">
			<div class="container">
				<div class="card login-card-container">
					<h5 class="card-title">SIGN UP</h5>
					<form id="form-signup" class="form-login" v-on:submit.prevent="handleRegister">
						<div class="tabs-login">
							<div class="form-check form-check-inline">
								<input
									class="form-check-input"
									type="radio"
									name="role"
									id="staff"
									value="1"
									v-model="role"
								/>
								<label
									class="form-check-label"
									for="staff"
									>Staff</label
								>
							</div>
							<div class="form-check form-check-inline">
								<input
									class="form-check-input"
									type="radio"
									name="role"
									id="admin"
									value="2"
									v-model="role"
								/>
								<label
									class="form-check-label"
									for="admin"
									>Admin</label
								>
							</div>
						</div>
						
						<div class="form-group">
                            <!-- Name -->
							<input
								type="text"
								class="form-control"
								placeholder="Your Name"
                                v-model="name"
							/>
						</div>

						<div class="form-group">
							<!-- Email -->
							<input
								type="email"
								class="form-control"
								placeholder="Email Address"
                                v-model="email"
							/>
						</div>
						<div class="form-group">
							<!-- password -->
							<input
								type="password"
								class="form-control"
								placeholder="Password"
                                v-model="password"
							/>
						</div>
						<div class="form-group">
							<!-- password confirm -->
							<input
								type="password"
								class="form-control"
								placeholder="Confirm Password"
                                v-model="confirm"
							/>
						</div>						

						<button
							class="btn btn-lg btn-primary btn-block btn-signup"
							type="submit"
						>
							Sign Up
						</button>
					</form>

					<h6 class="register"><router-link to="/">Click here to login</router-link></h6>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
	name: "register-page",
	data() {
		return {
            name: "",
            email: "",
            password: "",
            confirm: "",
            role: 0
        };
	},	
	computed: {
		...mapState(["currentUser"]),
	},
	methods: {
		...mapActions(['register', "resetCheckRole"]),
		handleRegister(){
			if(this.verifyForm){
				//to Actions
				let data = {
					email: this.email,
					password: this.password,
					name: this.name,
					role: this.role
				}
				this.register(data).then(resp =>{
					if(resp.isSuccess){
						// if (window.confirm("Create account successfully. Do you want to login now?")) {
							if(resp.role==2)
							this.$router.push({path:"/admin"}).catch(() => {});
							else if(resp.role==1)
							this.$router.push({path:"/staff"}).catch(() => {});	
						// }else{
						// 	auth.signOut();
						// 	this.resetCheckRole(this.currentUser.uid);
						// 	this.$router.push({path:"/admin"}).catch(() => {});
						// }
						
					}else{
						alert(resp.error);
					}
				})
			}
		},
		verifyForm(){
			if(this.password && this.email && this.confirm){
				if(this.password === this.confirm){
					return true;
				}	
				return false;
			}
			return false;
		}
	}
};
</script>

<style>
</style>