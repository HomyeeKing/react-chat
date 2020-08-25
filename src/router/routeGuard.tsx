import React, { FC, useEffect } from 'react'
import routerMap from './index'
import { Redirect, Route } from 'react-router-dom'
import { setLoginStatus, auth } from '../_actions/user_actions'
import { useDispatch } from 'react-redux'

const RouteGuard: FC = (props: any) => {
	const pathname = props.location.pathname
	const isLogin = localStorage.getItem('isLogin') === 'true'
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(setLoginStatus(isLogin))
		if (isLogin) {
			dispatch(auth())
		}
	}, [dispatch, isLogin])
	const targetRouter = routerMap.find((item) => {
		return pathname === item.path
	})

	if (pathname === '/' && !isLogin) {
		return <Redirect to="/login"></Redirect>
	} else {
		return <Route exact path={pathname} component={targetRouter?.component} />
	}
}

export default RouteGuard
