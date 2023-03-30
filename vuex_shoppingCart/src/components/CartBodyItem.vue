<template>
	<tr>
		<th scope="row">{{ index + 1 }}</th>
		<td>{{ product.name }}</td>
		<td>{{ formatPrice }}</td>
		<td>
			<input
				:value="cart.quantity"
				@blur="handleUpdate"
				name="cart-item-quantity-1"
				type="number"
				min="1"
			/>
		</td>
		<td>
			<strong>{{ formatTotal }}</strong>
		</td>
		<td>
			<a
				@click="handleUpdate"
				class="label label-info update-cart-item"
				href="#"
				data-product=""
				>Update</a
			>
			<a
				@click.prevent="handleDelete"
				class="label label-danger delete-cart-item"
				href="#"
				data-product=""
				>Delete</a
			>
		</td>
	</tr>
</template>

<script>
import { toCurrency, validateQuantity } from "../helpers";
import { mapActions } from "vuex";
import { NOTI_ACT_DELETE, NOTI_ACT_UPDATE, NOTI_GREATER_THAN_ONE } from "../constants/config";
export default {
	name: "cart-body-item",
	props: {
		cart: { type: Object },
		index: Number,
	},
	data() {
		return {};
	},
	computed: {
		product() {
			return this.cart.product;
		},
		// urlImage(){
		// 	return '/public/images/' + this.product.image;
		// },
		formatPrice() {
			return toCurrency(this.product.price);
		},
		formatTotal() {
			console.log(this.cart);
			return toCurrency(
				this.product.price * this.cart.quantity,
				"AUD",
				"right"
			);
		},
	},
	methods: {
		...mapActions({
			actDeleteCart: "cart/actDeleteCart",
			actUpdateQuantity: "cart/actUpdateQuantity",
			setLoading: "setLoading",
		}),
		handleDelete() {
			if (confirm("Do you want to delete this product")) {
				this.actDeleteCart(this.cart);
				this.$notify(NOTI_ACT_DELETE);
			}
		},
		handleUpdate(e) {
			this.setLoading(true);
			setTimeout(() => {
				let quantity = e.target.value;
				const check = validateQuantity(quantity);
				if (check) {
					let data = {
						cartUpdate: this.cart,
						quantity: parseInt(quantity),
					};
					this.actUpdateQuantity(data);
					this.$notify(NOTI_ACT_UPDATE);
				} else {
					e.target.value = this.cart.quantity;
					this.$notify(NOTI_GREATER_THAN_ONE);
				}
				this.setLoading(false);
			}, 1000);
		},
	},
};
</script>

<style>
</style>