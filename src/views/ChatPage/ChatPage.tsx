import React, { useEffect, useState } from 'react'
import { Form, Input } from 'antd'
import io from 'socket.io-client'

const socket = io.connect('http://localhost:5000')
interface msgProp {
	message: string
	name: string
}
const Chat = () => {
	const [state, setState] = useState<msgProp>({ message: '', name: '' })
	const [chat, setChat] = useState<msgProp[]>([])

	useEffect(() => {
		socket.on('message', ({ name, message }: msgProp) => {
			setChat([...chat, { name, message }])
		})
	})

	let onMessageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const { name, message } = state
		socket.emit('message', { name, message })
		setState({ message: '', name })
	}
	let onTextChange = (
		e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		setState({ ...state, [e.target.name]: e.target.value })
	}

	const renderChat = () => {
		return chat.map(({ name, message }, index) => (
			<div key={index}>
				<h2 style={{ color: 'blue' }}>
					{name}:
					<span style={{ color: 'black', marginLeft: '10px' }}>{message}</span>
				</h2>
			</div>
		))
	}

	return (
		<div>
			<div className="topNav">asdjkl</div>
			<div className="Chat">
				<Form>
					<Form.Item>
						<Input />
					</Form.Item>
				</Form>
				<div className="card">
					<h1>Chat Log</h1>
					{renderChat()}
				</div>
			</div>
		</div>
	)
}

export default Chat
