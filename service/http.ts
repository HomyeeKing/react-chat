const baseURL = 'http://localhost:5000'

export function generateAPI(param = {}) {
	const API = {}

	Object.keys(param).forEach((key) => {
		// 普通post
		if (typeof param[key] === 'string') {
			API[key] = async (params) => await axios.post(param[key], params)
		} else if (typeof param[key] === 'object') {
			API[key] = async (params) =>
				await axios[param[key].method](param.key.url, params)
		}
	})
	return API
}
