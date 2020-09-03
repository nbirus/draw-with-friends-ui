/* eslint-disable */
import { createRouter, createWebHistory } from 'vue-router'
import { userState } from '@/composition/User'
import { roomState, leaveRoom } from '@/composition/Room'

const routes = [
	{
		path: '/',
		name: 'rooms',
		component: () =>
			import(
				/* webpackChunkName: "rooms" */
				'@/views/RoomsPage.vue'
			),
	},
	{
		path: '/username',
		name: 'username',
		component: () =>
			import(
				/* webpackChunkName: "username" */
				'@/views/UsernamePage.vue'
			),
	},
	{
		path: '/:id',
		name: 'room',
		component: () =>
			import(/* webpackChunkName: "room" */ '@/views/RoomPage.vue'),
	},
	{
		path: '/:id/game',
		name: 'game',
		component: () =>
			import(/* webpackChunkName: "game" */ '@/views/GamePage.vue'),
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

let prevRoute = ''

router.beforeEach((to, from, next) => {
	// leave room
	if (roomState.roomid && ['game', 'room'].includes(from.name)) {
		leaveRoom(roomState.roomid)
	}

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
