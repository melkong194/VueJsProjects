<template>
	<div>
		<div class="post-preview" v-if="blog">
			<router-link :to="{
				name: 'blog-detail',
				params: { id:blog.id , title:blog.formatTitle }
			}">

			
			<a href="post.html">
				<h2 class="post-title">{{ blog.title }}</h2>
				<h3 class="post-subtitle">{{ blog.abstract }}</h3>
			</a>
			</router-link>
			<p class="post-meta">Posted by <a href="#">{{ blog.fullName }}</a> on {{ formatDate }}</p>
		</div>
		<hr />
	</div>
</template>

<script>
export default {
    name: 'blog-item',
    props: {
        blog: { type: Object, default: null }
    },
    computed: {
        formatDate() {
            var date = this.blog.create_at;
            var monthNames = [
                "January", "February", "March",
                "April", "May", "June", "July",
                "August", "September", "October",
                "November", "December"
            ];

            var day = date.getDate();
            var monthIndex = date.getMonth();
            var year = date.getFullYear();

            return day + ' ' + monthNames[monthIndex] + ' ' + year;
        },
        formatTitle() {
            return this.blog.title.split(' ').join('-').toLowerCase().replace('.', '');
        }
    }
}
</script>

<style>
</style>