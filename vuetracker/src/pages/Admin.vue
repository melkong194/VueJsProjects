<template>
    <div>
        <admin-header-comp />
        <router-view> </router-view>
    </div>
</template>

<script>
import AdminHeaderComp from '../components/AdminHeaderComp.vue'
export default{
    name: 'admin-page',
    components: {AdminHeaderComp},
    data(){
        return {
        }
    }
}
</script>

<style>

</style>