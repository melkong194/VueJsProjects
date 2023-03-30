<template>
    <header class="masthead" v-bind:style="`background-image: url('${bg}')`">
		<div class="overlay"></div>
		<div class="container">
			<div class="row">
				<div class="col-lg-8 col-md-10 mx-auto">
					<div v-bind:class="className">
						<h1>{{title}}</h1>
						<span class="subheading">{{subHeading}}</span>
						<slot></slot>
					</div>
				</div>
			</div>
		</div>
	</header>
</template>

<script>
export default{
    name: 'page-header',
	props:{
		bg: {type: String, default: 'public/img/home-bg.jpg'},
		className: {type: String, default: 'site-heading'},
		title: {type: String, default: 'Home Page'},
		subHeading: {type: String, default: 'A personal blog from Melko'}
    },
    data(){
        return {
        }
    }
}
</script>

<style>

</style>