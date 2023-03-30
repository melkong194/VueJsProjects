<template>
    <div>
        <h1>{{ count }} <span>{{ value2 }}</span></h1>
        <button v-on:click="count++">Plus</button>
        <button v-on:click="count--">Minus</button>        
    </div>
</template>

<script>
import {mapGetters, mapState, mapMutations, mapActions} from 'vuex'
export default{
    name: 'comp-counter-second',
    data(){
        return {
        }
    },
    computed: {
        ...mapGetters([
            'count',
            'value',
            'countDouble'
        ]),
        ...mapState([
            'value2'
        ])
    }
}
</script>

<style>

</style>