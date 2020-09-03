import axios from 'axios'
import { message } from 'antd'

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
		if (error.response.status === 401) {
			message.warning('身份过期请重新登录！')
			localStorage.setItem('isLogin', 'false')
			window.location.replace('/login')
			return
		}
		message.error('请求失败！', error)
	}
)

export default axios
