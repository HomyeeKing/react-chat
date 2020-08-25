import { GET_CHATS, AFTER_POST_MESSAGE } from '../_actions/types'
import { API_CALLBACK_PROP } from '../views/Config'
export default function (state = { chats: [] }, action: API_CALLBACK_PROP) {
	switch (action.type) {
		case GET_CHATS:
			return { ...state, chats: action.payload }
		case AFTER_POST_MESSAGE:
			return { ...state, chats: state.chats.concat(action.payload) }
		default:
			return state
	}
}
