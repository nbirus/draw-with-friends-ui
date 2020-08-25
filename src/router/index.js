import { createRouter, createWebHistory } from 'vue-router'

const routes = [
	{
		path: '/',
		name: 'Home',
		component: () => import(/* webpackChunkName: "home" */ '../views/HomePage.vue'),
	},
	{
		path: '/play',
		name: 'Game',
		component: () => import(/* webpackChunkName: "game" */ '../views/GamePage.vue'),
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

export default router
