import axios from 'axios'
import { GET_CHATS, AFTER_POST_MESSAGE } from './types'
import { CHAT_SERVER } from '../views/Config'
export async function getChats() {
	const request = await axios.post(`${CHAT_SERVER}/getChats`)
	return {
		type: GET_CHATS,
		payload: request.data
	}
}
export async function afterPostMessage(data: any) {
	return {
		type: AFTER_POST_MESSAGE,
		payload: data
	}
}
