<template>
    <div>
        <h1>{{ count }}</h1>
        <button v-on:click="plus">Plus</button>
        <button v-on:click="minus">Minus</button>
    </div>
</template>

<script>
import {mapGetters, mapState, mapMutations, mapActions} from 'vuex'
export default{
    name: 'comp-counter-third',
    data(){
        return {
        }
    },
    computed: {
        ...mapGetters([
            'count'
        ])
    },
    methods: {
        // ...mapActions([
        //     'incrementAction',
        //     'decrementAction'
        // ]),
        ...mapActions({
            'ABC': 'incrementAction',
            'DEF': 'decrementAction'
        }),
        plus() {
            // console.log("$store plus = ", this.$store);
            console.log("Plus Method  CounterThree.vue")
            // this.$store.commit('increment', 10);
            let obj = {
                number: 10
            }
            // this.$store.dispatch('incrementAction', obj);
            // this.incrementAction(obj);
            this.ABC(obj);
        },
        minus() {
            console.log("Minus Method  CounterThree.vue")
            // this.$store.commit('decrement', 10);
            let obj = {
                number: 10
            }
            // this.$store.dispatch('decrementAction', obj)
            // this.decrementAction(obj);
            this.DEF(obj);
        }
    }
}
</script>

<style>

</style>