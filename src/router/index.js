/* eslint-disable */
import {
	createRouter,
	createWebHistory
} from 'vue-router'
import {
	userState
} from '@/services/SocketService'

const routes = [{
		path: '/',
		name: 'rooms',
		component: () => import( /* webpackChunkName: "rooms" */ '../views/RoomsPage.vue'),
	},
	{
		path: '/username',
		name: 'username',
		component: () => import( /* webpackChunkName: "username" */ '../views/UsernamePage.vue'),
	},
	{
		path: '/:id/room',
		name: 'room',
		component: () => import( /* webpackChunkName: "room" */ '../views/RoomPage.vue'),
	},
	{
		path: '/:id',
		name: 'game',
		component: () => import( /* webpackChunkName: "game" */ '../views/GamePage.vue'),
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,

})

let prevRoute = ''

router.beforeEach((to, from, next) => {
	if (to.name === 'username') {
		next()
	} else if (!userState.username) {
		prevRoute = to.fullPath
		next('/username')
	} else if (prevRoute) {
		next(prevRoute)
		prevRoute = ''
	} else {
		next()
	}
})

export default router