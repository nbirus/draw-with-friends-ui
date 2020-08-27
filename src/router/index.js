/* eslint-disable */
import {
	createRouter,
	createWebHistory
} from 'vue-router'
import store from '@/store'

const routes = [{
		path: '/',
		name: 'Home',
		component: () => import( /* webpackChunkName: "home" */ '../views/HomePage.vue'),
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import( /* webpackChunkName: "login" */ '../views/LoginPage.vue'),
	},
	{
		path: '/play',
		name: 'Game',
		component: () => import( /* webpackChunkName: "game" */ '../views/GamePage.vue'),
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,

})

router.beforeEach((to, from, next) => {

	if (to.name === 'Login') {
		next()
	} else if (!store.getters['username']) {
		next('/login')
	} else {
		next()
	}
})

export default router