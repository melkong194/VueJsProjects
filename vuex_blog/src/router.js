import Vue from 'vue'
import VueRouter from 'vue-router'

import HomePage from './pages/HomePage.vue'
import Contact from './pages/Contact.vue'
import AboutUs from './pages/AboutUs.vue'
import BlogDetail from './pages/BlogDetail.vue'
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';

Vue.use(VueRouter)

const routes = [
	// { path: '/about-us', component: AboutUs },
	{
		path: '/',
        name: 'home-page',
		component: HomePage
	},
    {
		path: '/about-us',
        name: 'about-us',
		component: AboutUs
	},
    {
		path: '/contact',
        name: 'contact',
		component: Contact
	},
    {
		path: '/blog-detail/:title.:id',
        name: 'blog-detail',
		component: BlogDetail
	},
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '*',
        name: 'not-found',
        component: PageNotFound
    }
]

const router = new VueRouter({
	routes,
	// mode: 'history'
})

export default router