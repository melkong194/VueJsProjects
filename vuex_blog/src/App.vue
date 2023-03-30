<template>
	<div id="app">
		<navigation />
		
		<router-view />

		<comp-footer />
	</div>
</template>

<script>
import CompFooter from './components/CompFooter.vue'
import Navigation from './components/Navigation.vue'
import HomePage from './pages/HomePage.vue'
// import CompMenu from './components/CompMenu.vue';

export default {

	components: {Navigation, CompFooter, HomePage},
	name: 'app',
	data () {
		return {
			msg: 'Hellu Vuejs'	
		}
	},
	methods: {
		
	}
}
</script>

<style lang="scss">
*{
		box-sizing: border-box;
}


</style>
