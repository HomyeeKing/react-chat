import React, { FC, Suspense } from 'react'
import './index.css'
import { Switch } from 'react-router-dom'

import NavBar from './views/NavBar/NavBar'
import Footer from './views/Footer/Footer'
import RouteGuard from './router/routeGuard'

const App: FC = (store) => {
	return (
		<Suspense fallback={<div>loading .... </div>}>
			<NavBar />

			<div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
				<Switch>
					<RouteGuard />
				</Switch>
			</div>
			<Footer />
		</Suspense>
	)
}

export default App
