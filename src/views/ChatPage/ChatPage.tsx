import React, { useEffect, useState, useRef } from 'react'
import io from 'socket.io-client'

import {
	Input,
	Row,
	Col,
	Button,
	Upload,
	Avatar,
	Drawer,
	List,
	Tag,
	message
} from 'antd'
import { UploadOutlined, EnterOutlined } from '@ant-design/icons'
import './ChatPage.css'
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux'
import { afterPostMessage, getChats } from '../../_actions/chat_actions'
import { getUsers } from '../../_actions/user_actions'
import { REQUEST_ERROR } from '../../_actions/types'
const socket = io.connect('http://localhost:5000')

/**
 * 统一命名： 单个消息:message，
 * 通过用户_id来进行表连接，
 * 当前socket返回和数据库返回的差别是，socket返回的信息不包括消息的创建时间和更新时间
 */

const Chat = () => {
	const [forceUpdate, setForceUpdate] = useState<number>(0)
	const [drawShow, setDrawShow] = useState<boolean>(false)
	const [msg, setMsg] = useState('')
	const ref = useRef<HTMLDivElement>(null)

	const user = useSelector((state: RootStateOrAny) => state.user)
	const chat = useSelector((state: RootStateOrAny) => state.chat)

	const dispatch = useDispatch()

	useEffect(() => {
		const getChat = async () => {
			await dispatch(getChats())

			// 将滚动条置于底部
			ref.current?.scrollIntoView({ behavior: 'smooth' })
		}
		getChat()

		// 监听最新消息
		socket.on('front-message', (msgBack: any) => {
			dispatch(afterPostMessage(msgBack))
			ref.current?.scrollIntoView({ behavior: 'smooth' })
		})

		// 监听用户名单是否更新
		socket.on('user-list', () => {
			console.log('dispatch event to update user-list')
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
					setForceUpdate((c) => c + 1)
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

	const click2ShowDrawer = async () => {
		setDrawShow(!drawShow)
		dispatch(getUsers(user.userData._id))
		renderUser()
	}

	const renderUser = () => {
		return (
			<List
				dataSource={user.allUsers}
				loading={user === null}
				header={<h3>当前在线人数：{user.count}</h3>}
				renderItem={(item: any) => (
					<List.Item>
						<List.Item.Meta
							avatar={<Avatar src={item.avatar} />}
							title={
								item.username === user.userData.username ? (
									<span
										style={{
											color: 'gold'
										}}
									>
										{item.username}
										<Tag color="red" style={{ marginLeft: '10px' }}>
											我
										</Tag>
									</span>
								) : (
									<span>{item.username}</span>
								)
							}
						/>
					</List.Item>
				)}
			></List>
		)
	}

	return (
		<>
			<div style={{ textAlign: 'center', marginTop: '4rem' }}>
				<p style={{ fontSize: '2rem' }}> Real Time Chat</p>
			</div>
			<div style={{ maxWidth: '800px', margin: '0 auto' }}>
				<div className="infinite-container">
					{renderChat()}
					<div ref={ref} style={{ float: 'left', clear: 'both' }}></div>
				</div>

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
						<Upload>
							<Button className="height-100">
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
			<div className="right-drawer">
				<button onClick={click2ShowDrawer}>点我查看当前在线人数</button>
				<Drawer
					mask={false}
					title={<small style={{ color: 'gray' }}>用户列表</small>}
					footer={<small style={{ color: 'gray' }}>点击按钮或ESC关闭</small>}
					visible={drawShow}
					onClose={() => setDrawShow(false)}
				>
					{renderUser()}
				</Drawer>
			</div>
		</>
	)
}

export default Chat
