<template>
    <div>
        <h1>{{ count }}</h1>
        <h1>value = {{ value }}</h1>
        <button v-on:click="count++">Plus</button>
        <button v-on:click="count--">Minus</button>
        
    </div>
</template>

<script>
import {mapGetters, mapState, mapMutations, mapActions} from 'vuex'

export default{
    name: 'comp-counter',
    data(){
        return {
        }
    },
   computed: {
        count: {
            get () {
                return this.$store.getters.count;
            },
            set(newCount) {
                // Thay đổi state (count trong store);
                this.$store.state.count = newCount;
                // console.log("newCount = ", newCount);
            }
        },
        abc: function() {

        },
        ...mapGetters([
            'value',
            'countDouble'
        ])
    },
    mounted() {
        console.log(this.$store.getters.count);
        console.log(this.$store.getters.countDouble);
    }
}
</script>

<style>

</style>