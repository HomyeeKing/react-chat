import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000'
axios.interceptors.request.use((config) => {
	config.headers['Accept'] = 'application/json'
	config.withCredentials = true
	return config
})

axios.interceptors.response.use(
	(res) => {
		return Promise.resolve(res)
	},
	(error) => {
		console.log(error)

		// if (error.response.status === 302) {
		window.location.href = '/'
		return
		// }
		// else {
		// return Promise.reject(err);
		// }
	}
)

export default axios
