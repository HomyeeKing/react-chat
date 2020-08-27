import React, { useEffect, useRef } from 'react'
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux'
import { getChats } from '../../_actions/chat_actions'

const TestPage = () => {
	const chat = useSelector((state: RootStateOrAny) => state.chat)
	const ref = useRef<HTMLDivElement>(null)
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(getChats())
		console.log(ref.current)
	}, [dispatch])

	return (
		<div className="app">
			<div ref={ref}></div>
			{chat.chats.map((item: any) => {
				return <span>{item.message}</span>
			})}
		</div>
	)
}

export default TestPage
