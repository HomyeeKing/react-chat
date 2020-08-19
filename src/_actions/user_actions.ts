import axios from 'axios'
import { LOGIN_USER, LOGOUT_USER, AUTH_USER, REGISTER_USER } from './types'

import { USER_SERVER } from '../views/Config'

export async function registerUser(dataToSubmit: any) {
	const request = await axios.post(`${USER_SERVER}/register`, dataToSubmit)
	return {
		type: REGISTER_USER,
		payload: request
	}
}

export async function loginUser(dataToSubmit: any) {
	const request: any = await axios.post(`${USER_SERVER}/login`, dataToSubmit)
	return {
		type: LOGIN_USER,
		payload: request
	}
}
export async function auth() {
	const request = await axios.post(`${USER_SERVER}/auth`)
	return {
		type: AUTH_USER,
		payload: request
	}
}
export async function logoutUser() {
	const request = await axios.post(`${USER_SERVER}/logout`)
	return {
		type: LOGOUT_USER,
		payload: request
	}
}