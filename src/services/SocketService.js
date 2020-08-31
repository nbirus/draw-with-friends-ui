import io from 'socket.io-client'

export default io.connect(process.env.VUE_APP_URL, {
	autoConnect: false,
})
