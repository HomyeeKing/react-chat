import React from 'react'
import { MsgType } from './msgType'
export const msgCategory: MsgType = {
	text(msg: string) {
		return <p>{msg}</p>
	},
	img(msg: string) {
		return (
			<img
				style={{ objectFit: 'cover', minHeight: '200px' }} //记得要设置最小高度，要不然初始的时候图片和视频还没加载出来，导致当时的ref没有出现在视口内
				src={`http://localhost:5000/images/${msg}`}
				alt="chat-img"
			/>
		)
	},
	video(msg: string) {
		// 视频同
		return (
			<video controls style={{ minHeight: '360px' }}>
				<source src={`http://localhost:5000/videos/${msg}`} />
			</video>
		)
	}
}
