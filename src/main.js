import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'remixicon/fonts/remixicon.css'

// import styles
import './styles/main.scss'

createApp(App)
	.use(router)
	.mount('#app')
