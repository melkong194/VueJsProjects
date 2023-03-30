<template>
    <div class="page-404">
        <div>
            <img src="https://doyouconvert.com/wp-content/uploads/2018/04/404_Error.jpg" alt="404">
        </div>
        <router-link 
            tag="button"
            to="/"
            type="submit" class="btn btn-primary">Go to HomePage</router-link>
    </div>
</template>

<script>
export default {
    name: 'page-not-found'
}
</script>

<style>
    .page-404 {
        text-align: center;
    }
</style>