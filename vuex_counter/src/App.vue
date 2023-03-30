<template>
	<div id="app">
		<comp-counter />
		<comp-counter-second />
		<comp-counter-third />
	</div>
</template>

<script>
import CompCounter from './components/CompCounter.vue';
import CompCounterSecond from "./components/CompCounterSecond.vue";
import CompCounterThird from "./components/CompCounterThird.vue";


export default {
	components: { CompCounterSecond, CompCounter, CompCounterThird},
	name: "app",
	data() {
		return{
		}
	},
	methods: {},
};
</script>

<style lang="scss">
* {
	box-sizing: border-box;
}
#app {
	font-family: "Avenir";
	text-align: center;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	margin-top: 60px;
}
.container {
	max-width: 1170px;
	margin: 0 auto;
	padding: 0 15px;
	min-height: 3000px;
}
</style>
