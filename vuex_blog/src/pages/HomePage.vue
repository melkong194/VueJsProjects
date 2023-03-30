<template>
    <div>
        <page-header title="Clean Blog" subHeading="Lorem ipsum dolor sit amet, consectetur adipisicing" />

        <blog-list />
    </div>
</template>

<script>
import BlogList from '../components/BlogList.vue'
import PageHeader from '../components/PageHeader.vue'
export default{
	components: { PageHeader, BlogList },
    name: 'home-page',
    data(){
        return {
        }
    }
}
</script>

<style>

</style>