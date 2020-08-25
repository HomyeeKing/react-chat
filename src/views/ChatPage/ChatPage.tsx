import React, { useEffect, useState } from 'react'
import { Input, Row, Col, Button, Upload, Avatar } from 'antd'
import io from 'socket.io-client'
import { UploadOutlined, EnterOutlined } from '@ant-design/icons'
import './ChatPage.css'
import { useDispatch, useSelector } from 'react-redux'
import { afterPostMessage, getChats } from '../../_actions/chat_actions'
const socket = io.connect('http://localhost:5000')

/**
 * 统一命名： 单个消息:message，
 * 通过用户_id来进行表连接，
 * 当前socket返回和数据库返回的差别是，socket返回的信息不包括消息的创建时间和更新时间
 */
const Chat = () => {
	let chat = useSelector((state: any) => state.chat)
	let user = useSelector((state: any) => state.user)

	const [msg, setMsg] = useState('')

	const dispatch = useDispatch()
	useEffect(() => {
		// 获取消息
		dispatch(getChats())
		socket.on('front-message', (msgBack: any) => {
			dispatch(afterPostMessage(msgBack))
		})

		return () => {
			socket.close()
		}
	}, [dispatch])

	let onMessageSubmit = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
		e.preventDefault()

		if (!user || (user.userData && !user.userData.isAuth)) {
			return alert('请先进行登录')
		}

		const { username, _id, avatar } = user.userData
		socket.emit(
			'backend-message',
			{
				msg,
				username,
				_id,
				sendTime: +new Date(),
				avatar
			},
			(status: number) => {
				if (status === 0) {
					setMsg('')
				}
			}
		)
	}

	const renderChat = () => {
		return chat.chats.map((chat: any) => {
			return (
				<div key={chat._id} className="msg-block">
					<div className="avatar">
						<Avatar size={55} src={chat.sender?.avatar} />
					</div>
					<div className="chat-block-right">
						<small>{chat.sender?.username}</small>
						<p>{chat.message}</p>
					</div>
				</div>
			)
		})
	}

	return (
		<>
			<div style={{ textAlign: 'center', marginTop: '4rem' }}>
				<p style={{ fontSize: '2rem' }}> Real Time Chat</p>
			</div>
			<div style={{ maxWidth: '800px', margin: '0 auto' }}>
				<div className="infinite-container">{renderChat()}</div>

				<Row className="bottom-input">
					<Col span={18}>
						<Input.TextArea
							id="message"
							placeholder="Let's start talking"
							value={msg}
							onChange={(e) => setMsg(e.target.value)}
						/>
					</Col>
					<Col span={3}>
						<Upload className="upload">
							<Button>
								<UploadOutlined />
								点击上传
							</Button>
						</Upload>
					</Col>
					<Col span={3}>
						<Button
							type="primary"
							style={{ width: '100%' }}
							onClick={onMessageSubmit}
							htmlType="submit"
						>
							<EnterOutlined />
						</Button>
					</Col>
				</Row>
			</div>
		</>
	)
}

export default Chat
