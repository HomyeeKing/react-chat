import LoginPage from '../views/LoginPage/LoginPage'
import Register from '../views/RegisterPage/RegisterPage'
import ChatPage from '../views/ChatPage/ChatPage'
import LandingPage from '../views/LandingPage/LandingPage'
import Test from '../views/testPage/TestPage'
import FOF from '../views/FnPages/FourOFour'
export default [
	{ path: '/', name: 'Home', component: LandingPage },
	{ path: '/login', name: 'Login', component: LoginPage },
	{ path: '/register', name: 'Register', component: Register },
	{ path: '/chat', name: 'Chat', component: ChatPage },
	{
		path: '/test',
		name: 'Test',
		component: Test
	},
	{
		path: '/404',
		name: '404',
		component: FOF
	}
]
