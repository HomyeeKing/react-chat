import React from 'react'

import { MessageOutlined } from '@ant-design/icons'

function LandingPage() {
	return (
		<>
			<div className="app">
				<MessageOutlined style={{ fontSize: '4rem' }} />
				<br />
				<span style={{ fontSize: '2rem' }}>Let's Chat!</span>
			</div>
		</>
	)
}
export default LandingPage
