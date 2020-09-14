/* eslint-disable */
import {
	createRouter,
	createWebHistory
} from 'vue-router'
import {
	userState
} from '@/composition/User'
import {
	roomState,
	leaveRoom
} from '@/composition/Room'

const routes = [{
		path: '/',
		name: 'home',
		component: () =>
			import(
				/* webpackChunkName: "home" */
				'@/views/home-page/HomePage.vue'
			),
	},
	{
		path: '/username',
		name: 'username',
		component: () =>
			import(
				/* webpackChunkName: "username" */
				'@/views/username-page/UsernamePage.vue'
			),
	},
	{
		path: '/:id',
		name: 'room',
		component: () =>
			import( /* webpackChunkName: "room" */ '@/views/room-page/RoomPage.vue'),
	},
	{
		path: '/:id/game',
		name: 'game',
		component: () =>
			import( /* webpackChunkName: "game" */ '@/views/game-page/GamePage.vue'),
	},
	{
		path: '/:id/results',
		name: 'results',
		component: () =>
			import( /* webpackChunkName: "results" */ '@/views/GameResultsPage.vue'),
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

let prevRoute = ''

router.beforeEach((to, from, next) => {
	if (to.name === 'room' && roomState.active) {
		next('game')
	} else if (to.name === 'username') {
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

router.afterEach(to => {
	if (roomState.roomid && !['game', 'room', 'results'].includes(to.name)) {
		leaveRoom(roomState.roomid)
	}
})

export default router