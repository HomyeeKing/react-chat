import React from 'react'
import axios from '../../../utils/axios'
import { USER_SERVER } from '../../Config'
import { useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Menu } from 'antd'

const RightMenu = (props: any) => {
	const user = useSelector((state: any) => state.user)
	console.log(user)

	const logoutHandler = () => {
		axios.get(`${USER_SERVER}/logout`).then((res) => {
			if (res.status === 200) {
				props.history.push('/login')
			} else {
				alert('log out failed')
			}
		})
	}
	//没有登录认证

	if (user.userData && !user.userData.isAuth) {
		return (
			<Menu mode={props.mode}>
				<Menu.Item key="mail">
					<a href="/login">Signin</a>
				</Menu.Item>
				<Menu.Item key="app">
					<a href="/register">Signup</a>
				</Menu.Item>
			</Menu>
		)
	} else {
		return (
			<Menu mode={props.mode}>
				<Menu.Item key="logout">
					<a onClick={logoutHandler}>Logout</a>
				</Menu.Item>
			</Menu>
		)
	}
}

export default withRouter(RightMenu)
