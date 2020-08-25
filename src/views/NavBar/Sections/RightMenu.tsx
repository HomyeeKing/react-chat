import React from 'react'
import axios from '../../../utils/axios'
import { USER_SERVER } from '../../Config'
import { useSelector, useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Menu, message, Avatar, Button } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { setLoginStatus } from '../../../_actions/user_actions'

const RightMenu = (props: any) => {
	const user = useSelector((state: any) => state.user)
	const dispatch = useDispatch()
	const logoutHandler = async () => {
		try {
			let res = await axios.post(`${USER_SERVER}/logout`)
			if (res.data.success) {
				message.warning('账号已退出登录')
				dispatch(setLoginStatus(false))
				props.history.replace('/')
			}
		} catch (error) {
			message.error('退出登录失败，请检查网络！' + error)
		}
	}

	const avatarContent = () => {
		return (
			(user.userData && user.userData.username.charAt(0).toUpperCase()) || null
		)
	}

	if (!user.isLogin) {
		//没有登录认证
		return (
			<Menu mode={props.mode}>
				<Menu.Item key="mail">
					<a href="/login">登录</a>
				</Menu.Item>
				<Menu.Item key="app">
					<a href="/register">注册</a>
				</Menu.Item>
			</Menu>
		)
	} else {
		return (
			<Menu mode={props.mode}>
				<>
					<Avatar
						style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }}
						size="large"
						icon={avatarContent() || <UserOutlined />}
					>
						{avatarContent()}
					</Avatar>
				</>

				<Menu.Item key="logout">
					<Button onClick={logoutHandler} size="large" type="dashed">
						退出登录
					</Button>
				</Menu.Item>
			</Menu>
		)
	}
}

export default withRouter(RightMenu)
