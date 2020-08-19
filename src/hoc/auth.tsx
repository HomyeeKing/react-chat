import React, { useEffect, ComponentType } from 'react'
import { auth } from '../_actions/user_actions'
import { API_CALLBACK_PROP } from '../views/Config'
import { useSelector, useDispatch } from 'react-redux'

export default function <T>(
	SpecificComponent: ComponentType<T>,
	option: any,
	adminRoute = null
) {
	const AuthenticationCheck = (props: any) => {
		let user = useSelector((state: any) => state.user)
		const dispatch = useDispatch()
		useEffect(() => {
			dispatch(auth()).then((res: API_CALLBACK_PROP) => {
				//without auth

				if (!res.payload.isAuth) {
					if (option) {
						props.history.push('/login')
					}
				} else {
					if (adminRoute && !res.payload.isAdmin) {
						props.history.push('/')
					} else {
						if (option === false) {
							props.history.push('/')
						}
					}
				}
			})
		}, [])

		return <SpecificComponent {...props} user={user} />
	}
	return AuthenticationCheck
}
