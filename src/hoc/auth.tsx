import { auth } from '../_actions/user_actions'

import { useDispatch } from 'react-redux'

export default async function () {
	const dispatch = useDispatch()

	let res = await dispatch(auth())
	const { isAuth } = res.payload
	return isAuth
}
