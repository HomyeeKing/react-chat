import LoginPage from '../views/LoginPage/LoginPage'
import Register from '../views/RegisterPage/RegisterPage'
import ChatPage from '../views/ChatPage/ChatPage'
import LandingPage from '../views/LandingPage/LandingPage'
export default [
	{ path: '/', name: 'Home', component: LandingPage },
	{ path: '/login', name: 'Login', component: LoginPage },
	{ path: '/register', name: 'Register', component: Register },
	{ path: '/chat', name: 'Chat', component: ChatPage }
]
