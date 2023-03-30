<template>
	<tbody id="my-cart-body">
		<!-- CART BODY -->
		<template v-if="items.length">
			<cart-body-item 
				v-for="(item, index) in items" 
                :index="index"
                :key="item.product.id"
                :cart="item"
			/>
		</template >
		<tr v-else>
			<th colspan="6">{{NOTI_EMPTY_PRODUCT}}</th>
		</tr>
	</tbody>
</template>

<script>
import { mapState } from 'vuex';
import { NOTI_EMPTY_PRODUCT } from '../constants/config'
import CartBodyItem from './CartBodyItem.vue';
export default {
	components: {CartBodyItem},  
	name: "cart-body-table",
	data() {
		return {
			NOTI_EMPTY_PRODUCT
		};
	},
	computed:{
		...mapState({
			items: state=>state.cart.listCarts
		})
	}
};
</script>

<style>
</style>