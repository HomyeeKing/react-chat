import React, { useState } from 'react'
import { Form, Input, Checkbox, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import './LoginPage.css'
import { useDispatch } from 'react-redux'
import { loginUser, setLoginStatus } from '../../_actions/user_actions'
const LoginPage = (props: any) => {
	const dispatch = useDispatch()
	const REMEMBERME = 'rememberMe'

	const rememberMeChecked = localStorage.getItem(REMEMBERME) ? true : false

	const [rememberMe, setrememberMe] = useState(rememberMeChecked)

	const handleRememberMe = () => {
		setrememberMe(!rememberMe)
	}

	const onFinish = async (values: any) => {
		try {
			let res = await dispatch(loginUser(values))
			const { loginSuccess, message: msg } = res.payload
			if (loginSuccess) {
				// 设置登录状态
				dispatch(setLoginStatus(true))
				if (rememberMe) {
					localStorage.setItem(REMEMBERME, values.phone)
				} else {
					localStorage.removeItem(REMEMBERME)
				}
				message.success(msg)
				props.history.push('/')
			} else {
				message.error(msg)
			}
		} catch (error) {
			console.log(error)

			message.error('网络异常，请检查网络！')
		}
	}
	const initUserAccount = localStorage.getItem(REMEMBERME)
		? localStorage.getItem(REMEMBERME)
		: ''
	return (
		<div className="app">
			<Form
				name="normal_login"
				className="login-form"
				initialValues={{ phone: initUserAccount }}
				onFinish={onFinish}
			>
				<Form.Item
					name="phone"
					rules={[{ required: true, message: '请输入手机号进行登录' }]}
				>
					<Input
						size="large"
						prefix={<UserOutlined className="site-form-item-icon" />}
						placeholder="请输入手机号..."
					/>
				</Form.Item>
				<Form.Item
					name="password"
					rules={[{ required: true, message: '请输入密码' }]}
				>
					<Input
						size="large"
						prefix={<LockOutlined className="site-form-item-icon" />}
						type="password"
						placeholder="请输入密码..."
					/>
				</Form.Item>
				<Form.Item>
					<Form.Item name="remember">
						<Checkbox
							id="rememberMe"
							onChange={handleRememberMe}
							checked={rememberMe}
						>
							记住我
						</Checkbox>
					</Form.Item>

					<a className="login-form-forgot" href="/">
						忘记密码
					</a>
				</Form.Item>

				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						className="login-form-button"
					>
						登录
					</Button>
					Or <a href="/register">立即注册!</a>
				</Form.Item>
			</Form>
		</div>
	)
}

export default LoginPage
