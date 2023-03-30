<template>
	<div>
		<b-navbar class="staff navbar navbar-expand-md" toggleable="lg" type="info" variant="dark">
			<b-navbar-brand href="#">welcome to STAFFmode</b-navbar-brand>

			<!-- Right aligned nav items -->
			<b-navbar-nav class="ml-auto">
				<b-navbar-nav>
					<b-nav-item class="link">
						<router-link 
							tag="div"
							exactActiveClass=""
							activeClass=""
							v-bind:to="{ 
							name: 'staff-project-list'}"
				>Assigned Projects</router-link></b-nav-item>

				</b-navbar-nav>

				<b-nav-item-dropdown right>
					<!-- Using 'button-content' slot -->
					<template #button-content>
						<em v-if="currentUser.email">
							{{ currentUser.email }}
						</em>
					</template>
					<b-dropdown-item href="#">Profile</b-dropdown-item>
					<b-dropdown-item href="#" v-on:click.prevent="handleLogout">
						Sign Out</b-dropdown-item
					>
				</b-nav-item-dropdown>
			</b-navbar-nav>
		</b-navbar>
	</div>
</template>

<script>
import { auth } from "../config/database";
import { mapState, mapActions } from "vuex";
export default {
	name: "staff-header-comp",
	data() {
		return {};
	},
	computed: {
		...mapState(["currentUser"]),
	},
	methods: {
		...mapActions(["resetCheckRole"]),
		handleLogout() {
			if (window.confirm("Are you sure you want to logout?")) {
				auth.signOut();
				this.resetCheckRole(this.currentUser.uid);
				this.$router.push({path:"/admin"}).catch(() => {});
			}
		},
	},
};
</script>

<style>
</style>