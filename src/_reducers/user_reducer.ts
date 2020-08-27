import {
	LOGIN_USER,
	REGISTER_USER,
	AUTH_USER,
	LOGOUT_USER,
	SET_LOGIN_STATUS,
	GET_USERS,
	REQUEST_ERROR
} from '../_actions/types'

import { API_CALLBACK_PROP } from '../views/Config'
import { message } from 'antd'
export default function (state = {}, action: API_CALLBACK_PROP) {
	switch (action.type) {
		case REGISTER_USER:
			return { ...state, register: action.payload }
		case LOGIN_USER:
			return { ...state, loginSuccess: action.payload }
		case SET_LOGIN_STATUS:
			localStorage.setItem('isLogin', action.payload)
			return { ...state, isLogin: action.payload }
		case AUTH_USER:
			return { ...state, userData: action.payload }
		case LOGOUT_USER:
			return { ...state }
		case GET_USERS:
			return {
				...state,
				allUsers: action.payload.users,
				count: action.payload.count
			}
		case REQUEST_ERROR:
			return message.error('请求失败！')

		default:
			return state
	}
}
