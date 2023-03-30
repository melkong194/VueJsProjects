import Vue from 'vue'
import VueRouter from 'vue-router';
import $ from 'jquery'

import Login from '../pages/Login';
import Register from '../pages/Register';
import Portal from '../pages/Portal';
import Staff from '../pages/Staff';
import Admin from '../pages/Admin';
import StaffProjectList from '../pages/StaffProjectList';
import AdminProjectCreate from '../pages/AdminProjectCreate';
import StaffProjectDetail from '../pages/StaffProjectDetail';
import AdminChatMessage from '../pages/AdminChatMessage';
import StaffChatMessage from '../pages/StaffChatMessage';
import AdminProjectList from '../pages/AdminProjectList';
import AdminProjectDetail from '../pages/AdminProjectDetail';
import AdminProjectEdit from '../pages/AdminProjectEdit';
import StaffCheckin from '../pages/StaffCheckin';
import StaffReports from '../pages/StaffReports';
import AdminReports from '../pages/AdminReports';

import { ifNotAuthenticated, ifAuthenticated, ifAdminAuthenticated, ifStaffAuthenticated } from '../plugin/authenticate'

Vue.use(VueRouter)

const routes = [
	{
		path: '/login',
		beforeEnter: ifNotAuthenticated,
		name: 'login-page',
		component: Login
	},
	{
		path: '/register',
		beforeEnter: ifNotAuthenticated,
		name: 'register-page',
		component: Register
	}, {
		path: '/',
		beforeEnter: ifAuthenticated,
		component: Portal,
		name: 'portal-page',
		children: [
			{
				path: 'staff',
				name: 'staff-page',
				beforeEnter: ifStaffAuthenticated,
				component: Staff,
				children: [
					{
						path: '/',
						name: 'staff-project-list',
						component: StaffProjectList
					},
					{
						path: '/staff/chat/:id',
						name: 'staff-chat-message',
						component: StaffChatMessage
					},
					{
						path: '/staff/projectDetail/:id',
						name: 'staff-project-detail',
						component: StaffProjectDetail
					},
					{
						path: '/staff/checkin/:id',
						name: 'staff-checkin',
						component: StaffCheckin
					},
					{
						path: '/staff/records/:id',
						name: 'staff-reports',
						component: StaffReports
					}
				]
			},
			{
				path: 'admin',
				name: 'admin-page',
				beforeEnter: ifAdminAuthenticated,
				component: Admin,
				children: [
					{
						path: '/',
						name: 'admin-project-list',
						component: AdminProjectList
					},
					{
						path: '/admin/chatMessage/:id',
						name: 'chat-message',
						component: StaffChatMessage
					},
					{
						path: '/admin/create',
						name: 'admin-project-create',
						component: AdminProjectCreate
					},
					{
						path: '/admin/projectDetail/:id',
						name: 'admin-project-detail',
						component: AdminProjectDetail
					},
					{
						path: '/admin/projectEdit/:id',
						name: 'admin-project-edit',
						component: AdminProjectEdit
					},
					{
						path: '/admin/chat/:id',
						name: 'admin-chat-message',
						component: AdminChatMessage
					},
					{
						path: '/admin/reports/:id',
						name: 'admin-reports',
						component: AdminReports
					}
				]
			},

		]
	}
]

const router = new VueRouter({
	mode: 'history',
	routes
})
export default router;