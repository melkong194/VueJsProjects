<template>
	<div id="app">
		<router-view></router-view>
		<loading :class="{ show: isLoading }"/>
	</div>
</template>

<script>
import Loading from './components/Loading';
import { mapState, mapActions } from 'vuex';
export default {
	components: {Loading},
	name: 'app',
	data () {
		return {
			
		}
	},
	computed: mapState([ 'isLoading' ]),
	created(){
		this.onListenerProjects();
		this.onListenerUser();
		this.onListenerMessages();
		this.onListenerCheckins();
		this.onListenerRecords();
	},
	methods: {
		...mapActions(['onListenerProjects', 'onListenerUser', 'onListenerMessages', 'onListenerCheckins', 'onListenerRecords'])
	}
}
</script>

<style>

</style>
