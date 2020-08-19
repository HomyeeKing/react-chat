import React, { FC, Suspense } from 'react'
import './index.css'
import { Route, Switch } from 'react-router-dom'
import RouterMap from './router'
import NavBar from './views/NavBar/NavBar'
import Footer from './views/Footer/Footer'
import Auth from './hoc/auth'

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

const App: FC = () => {
	return (
		<Suspense fallback={<div>loading .... </div>}>
			<NavBar />
			<div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
				<Switch>
					{RouterMap.map((item, index) => {
						return (
							<Route
								key={index}
								exact
								path={item.path}
								component={Auth(
									item.component,
									item.path === '/' ? null : false
								)}
							/>
						)
					})}
				</Switch>
			</div>
			<Footer />
		</Suspense>
	)
}

export default App
