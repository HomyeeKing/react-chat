import React from 'react'
import { Form, Input, Tooltip, Select, Button, message } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../_actions/user_actions'
const { Option } = Select

const formItemLayout = {
	labelCol: {
		xs: {
			span: 24
		},
		sm: {
			span: 8
		}
	},
	wrapperCol: {
		xs: {
			span: 24
		},
		sm: {
			span: 16
		}
	}
}
const tailFormItemLayout = {
	wrapperCol: {
		xs: {
			span: 24,
			offset: 0
		},
		sm: {
			span: 16,
			offset: 8
		}
	}
}

// component
const RegisterPage = (props: any) => {
	const [form] = Form.useForm()
	const dispatch = useDispatch()
	const onFinish = async (values: any) => {
		console.log('Received values of form: ', values)
		try {
			let res = await dispatch(registerUser(values))
			const { success } = res.payload.data
			console.log(res)

			if (success) {
				message.success('注册成功!')
				props.history.push('/login')
			} else {
				message.error('账号已经被注册，注册失败！')
			}
		} catch (error) {
			alert('网络异常' + error)
		}
	}

	const prefixSelector = (
		<Form.Item name="prefix" noStyle>
			<Select
				style={{
					width: 70
				}}
			>
				<Option value="86">+86</Option>
				<Option value="87">+87</Option>
			</Select>
		</Form.Item>
	)

	return (
		<div className="app">
			<Form
				{...formItemLayout}
				form={form}
				name="register"
				onFinish={onFinish}
				initialValues={{
					prefix: '86'
				}}
				scrollToFirstError
				className="login-form"
			>
				<Form.Item
					name="phone"
					label="电话号"
					rules={[
						{
							required: true,
							pattern: /^\d{11}$/,
							message: '手机号不符合格式'
						}
					]}
				>
					<Input
						maxLength={11}
						addonBefore={prefixSelector}
						style={{
							width: '100%'
						}}
					/>
				</Form.Item>
				<Form.Item
					name="username"
					label={
						<span>
							昵称&nbsp;
							<Tooltip title="What do you want others to call you?">
								<QuestionCircleOutlined />
							</Tooltip>
						</span>
					}
					rules={[
						{
							required: true,
							message: 'Please input your nickname!',
							whitespace: true
						}
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name="email"
					label="邮箱"
					rules={[
						{
							type: 'email',
							message: 'The input is not valid E-mail!'
						},
						{
							required: true,
							message: 'Please input your E-mail!'
						}
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					name="password"
					label="密码"
					rules={[
						{
							required: true,
							message: 'Please input your password!'
						}
					]}
					hasFeedback
				>
					<Input.Password />
				</Form.Item>

				<Form.Item
					name="confirm"
					label="确认密码"
					dependencies={['password']}
					hasFeedback
					rules={[
						{
							required: true,
							message: 'Please confirm your password!'
						},
						({ getFieldValue }) => ({
							validator(rule, value) {
								if (!value || getFieldValue('password') === value) {
									return Promise.resolve()
								}

								return Promise.reject(
									'The two passwords that you entered do not match!'
								)
							}
						})
					]}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item {...tailFormItemLayout}>
					<Button
						type="primary"
						htmlType="submit"
						className="login-form-button"
					>
						注册
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

export default RegisterPage
