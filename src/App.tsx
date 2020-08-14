import React, { FC, useState, useEffect } from 'react'
import io from 'socket.io-client'
import './index.css'
import TextField from '@material-ui/core/TextField'

const socket = io.connect('http://localhost:5000')
interface msgProp {
	message: string
	name: string
}
const App: FC = () => {
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
					{name}:<span style={{ color: 'black' }}>{message}</span>
				</h2>
			</div>
		))
	}
	return (
		<div className="App">
			<div className="topNav">asdjkl</div>
			<div className="Chat">
				<form onSubmit={onMessageSubmit} className="card chatPanel">
					<h1>Message</h1>
					<div className="name-field">
						<TextField
							name="name"
							placeholder="Tab to choose..."
							onChange={(
								e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
							) => onTextChange(e)}
							value={state.name}
							label="Name"
						></TextField>
						<TextField
							name="message"
							placeholder="Enter to Send ...."
							onChange={(
								e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
							) => onTextChange(e)}
							value={state.message}
							label="Message"
							variant="outlined"
						></TextField>
					</div>
					<button
						className="btn"
						color="primary"
						disabled={state.message === ''}
					>
						Send Message
					</button>
				</form>
				<div className="card">
					<h1>Chat Log</h1>
					{renderChat()}
				</div>
			</div>
		</div>
	)
}

export default App
