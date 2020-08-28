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
	Tag
} from 'antd'
import {
	EnterOutlined,
	PictureFilled,
	PlaySquareFilled
} from '@ant-design/icons'
import './ChatPage.css'
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux'
import { afterPostMessage, getChats } from '../../_actions/chat_actions'
import { getUsers } from '../../_actions/user_actions'
import { CHAT_SERVER } from '../Config'

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
	const [fileList, setFileList] = useState([])

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
		if (fileList.length > 0) {
			fileList.forEach((file: any) => {
				console.log(file.response.paths[0])

				socket.emit('backend-message', {
					msg: file.response.paths[0],
					username,
					avatar,
					sendTime: Date.now(),
					_id,
					type: 'img'
				})
			})
		}
		if (msg !== '') {
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
	}

	const msgCategory: any = {
		text: function (msg: string) {
			return <p>{msg}</p>
		},
		img: function (msg: string) {
			return (
				<img
					style={{ objectFit: 'cover' }}
					src={`http://localhost:5000/images/${msg}`}
					alt="chat-img"
				/>
			)
		},
		video: function (msg: string) {
			return <audio src={`http://localhost:5000/images/${msg}`}></audio>
		}
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
						{msgCategory[chat.type](chat.message)}
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

	// 图片上传
	const handleImageUpload = ({ file, fileList, event }: any) => {
		console.log(file)

		setFileList(fileList)
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
				<Row className="function-area">
					<Col span={3} title="发送图片">
						<Upload
							multiple
							accept="image/*"
							name="images"
							fileList={fileList}
							action={`http://localhost:5000${CHAT_SERVER}/uploadImages`}
							withCredentials={true}
							onChange={handleImageUpload}
						>
							<PictureFilled />
						</Upload>
					</Col>
					<Col span={3} title="发送视频">
						<Upload
							multiple
							accept="video/*"
							name="videos"
							withCredentials={true}
							action={`http://localhost:5000${CHAT_SERVER}/uploadVideos`}
						>
							<PlaySquareFilled />
						</Upload>
					</Col>
				</Row>
				<Row className="bottom-input">
					<Col span={20}>
						<Input.TextArea
							id="message"
							placeholder="Let's start talking"
							value={msg}
							onChange={(e) => setMsg(e.target.value)}
						/>
					</Col>

					<Col span={4}>
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
