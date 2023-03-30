<template>
	<div class="col-12 col-lg-6">
		<div class="row">
			<!-- SORT :-->
            <control-sort 
				v-on:handleSort="handleSort"
				v-bind:orderBy="orderBy"
				v-bind:orderDir="orderDir"
			/>

			<!-- SEARCH :-->
			<control-search
				v-bind:strSearch="strSearch"
				v-on:handleSearch="handleSearch"
			/>

		</div>
	</div>
</template>

<script>
import ControlSearch from './ControlSearch.vue';
import ControlSort from './ControlSort.vue';
export default {
	components: { ControlSort, ControlSearch },
	name: "comp-control",
	props:{
		strSearch : {type: String, default: ''},
		orderBy : {type: String, default: 'name'},
		orderDir : {type: String, default: 'asc'}
	},
	data() {
		return {};
	},
	methods:{
		handleSearch(data){
			this.$emit("handleSearch", data);
		},
		handleSort(data){
			this.$emit('handleSort',data);
		}
	}
};
</script>

<style>
</style>