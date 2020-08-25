import React from 'react'
import logProps from '../../hoc/hoc'

function hi() {
	return <div className="app">hihi</div>
}
const TestPage = logProps(hi)

export default TestPage
