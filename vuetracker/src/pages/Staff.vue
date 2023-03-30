<template>
    <div>
        <staff-header-comp />
        <router-view> </router-view>
    </div>
</template>

<script>
import StaffHeaderComp from '../components/StaffHeaderComp.vue'
export default{
    name: 'staff-page',
    components: {StaffHeaderComp},
    data(){
        return {
        }
    }
}
</script>

<style>

</style>