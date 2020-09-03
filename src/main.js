import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Icon from './components/utils/Icon'

// import styles
import './styles/main.scss'

createApp(App)
	.use(router)
	.component('Icon', Icon)
	.mount('#app')
