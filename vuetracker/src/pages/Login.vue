<template>
	<div class="app">
		<div id="page-login">
			<div class="container">
				<div class="card login-card-container">
					<div class="profile-image-card">
						<img
							class="profile-image-card"
							alt=""
							src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png"
						/>
					</div>

					<form id="form-signup" class="form-login" v-on:submit.prevent="handleLogin">
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
							<!-- Email  -->
							<input
								type="email"
								class="form-control"
								placeholder="Email Address"
								v-model="email"
							/>
						</div>
						<div class="form-group">
							<!-- Password -->
							<input
								type="password"
								class="form-control"
								placeholder="Password"
								v-model="password"
							/>
						</div>
						<button
							class="btn btn-lg btn-primary btn-block btn-login"
							type="submit"

						>
							Log in
						</button>
					</form>
					<!-- <a href="#" class="link-login">Forgot password</a> -->
					<h6 class="register">Haven't had an account? <router-link to="/register">Register here</router-link></h6>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions } from "vuex";
export default {
	name: "login-page",
	data() {
		return {
			role: 0,
			email: "",
			password: ""
		};
	},
	methods: {
		...mapActions(['login']),
		handleLogin(){
			if(this.verifyForm){
				//to Actions
				let data = {
					email: this.email,
					password: this.password,
					role: this.role
				}
				this.login(data).then(resp=>{
					if(resp.isSuccess){
						// login sucess, locate to another page
						if(resp.role==2)
							this.$router.push({path:"/admin"}).catch(() => {});
						else if(resp.role==1)
							this.$router.push({path:"/staff"}).catch(() => {});
					}else{
						alert(resp.error);
					}
				})
			}
		},
		verifyForm(){
			if(this.password && this.email && role!==0){
				return false;
			}
			return false;
		}
	}
};
</script>

<style>
</style>