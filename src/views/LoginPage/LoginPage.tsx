import React, { useState } from 'react'
import { Form, Input, Checkbox, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import './LoginPage.css'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../_actions/user_actions'
const LoginPage = (props: any) => {
	const dispatch = useDispatch()
	const REMEMBERME = 'rememberMe'

	const rememberMeChecked = localStorage.getItem(REMEMBERME) ? true : false
	const [rememberMe, setrememberMe] = useState(rememberMeChecked)
	const handleRememberMe = () => {
		console.log(rememberMeChecked)

		setrememberMe(!rememberMe)
	}
	const onFinish = async (values: any) => {
		console.log(values)
		try {
			let res = await dispatch(loginUser(values))
			if (res.payload.loginSuccess) {
				window.localStorage.setItem('uid', res.payload.uid)
				if (rememberMe) {
					localStorage.setItem(REMEMBERME, values.username)
				} else {
					localStorage.removeItem(REMEMBERME)
				}
				// props.history.push('/')
			} else {
				alert('账号或密码错误')
			}
		} catch (error) {
			alert('网络异常')
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
				initialValues={{ remember: true }}
				onFinish={onFinish}
			>
				<Form.Item
					name="uid"
					rules={[{ required: true, message: 'Please input your Username!' }]}
				>
					<Input
						size="large"
						prefix={<UserOutlined className="site-form-item-icon" />}
						placeholder="Username"
					/>
				</Form.Item>
				<Form.Item
					name="password"
					rules={[{ required: true, message: 'Please input your Password!' }]}
				>
					<Input
						prefix={<LockOutlined className="site-form-item-icon" />}
						type="password"
						placeholder="Password"
					/>
				</Form.Item>
				<Form.Item>
					<Form.Item name="remember" valuePropName="checked" noStyle>
						<Checkbox
							id="remembere"
							onChange={handleRememberMe}
							checked={rememberMe}
						>
							Remember me
						</Checkbox>
					</Form.Item>

					<a className="login-form-forgot" href="/">
						Forgot password
					</a>
				</Form.Item>

				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						className="login-form-button"
					>
						Log in
					</Button>
					Or <a href="/register">register now!</a>
				</Form.Item>
			</Form>
		</div>
	)
}

export default LoginPage
