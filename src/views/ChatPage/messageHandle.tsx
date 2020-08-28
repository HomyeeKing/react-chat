import React from 'react'
import { MsgType } from './msgType'
export const msgCategory: MsgType = {
	text(msg: string) {
		return <p>{msg}</p>
	},
	img(msg: string) {
		return (
			<img
				style={{ objectFit: 'cover' }}
				src={`http://localhost:5000/images/${msg}`}
				alt="chat-img"
			/>
		)
	},
	video(msg: string) {
		return (
			<video controls>
				<source src={`http://localhost:5000/videos/${msg}`} />
			</video>
		)
	}
}
