import axios from 'axios'

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
		// if (error.response.status === 302) {
		window.location.href = '/rest/business/redirect'
		return
		// }
		// else {
		// return Promise.reject(err);
		// }
	}
)

export default axios
