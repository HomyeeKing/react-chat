import React, { FC } from 'react'
function logProps(WrappedComponent: FC) {
	return class extends React.Component {
		componentDidUpdate(prevProps: any) {
			console.log('Current props: ', this.props)
			console.log('Previous props: ', prevProps)
		}
		render() {
			// 将 input 组件包装在容器中，而不对其进行修改。Good!
			return <WrappedComponent {...this.props} />
		}
	}
}
export default logProps
