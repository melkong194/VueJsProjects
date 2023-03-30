<template>
	<div class="container">
		<loading :class="{ show: isLoading }"/>
		
		<comp-title />

		<div class="row">
			<product-list />

			<cart-wrapper />
		</div>
		<notifications group='noti' position="bottom right" />
	</div>
</template>

<script>
import {mapState} from 'vuex'
import CartWrapper from './components/CartWrapper.vue';
import ProductList from './components/ProductList.vue';
import CompTitle from './components/CompTitle.vue';
import Loading from './components/Loading.vue';
export default {
	components: {CartWrapper, ProductList, CompTitle, Loading},
	name: "app",
	data() {
		return {
			msg: "Hellu Vuejs",
		};
	},
	computed: {
		...mapState(["isLoading"])
	}, mounted(){
		
	}
};
</script>

<style lang="scss">
* {
	box-sizing: border-box;
}
.notifications{
	padding-right: 10px;
	padding-bottom: 10px;
}
</style>
