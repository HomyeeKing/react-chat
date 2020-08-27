var express = require('express')
var router = express.Router()

const User = require('../model/user')
const auth = require('../middleware/auth')
/* GET users listing. */
router.get('/', function (req, res, next) {
	// res.send('respond with a resource')
	res.redirect('https://www.baidu.com')
})

router.post('/register', (req, res) => {
	const user = new User(req.body)
	user.save((err, doc) => {
		if (err) return res.json({ success: false, err })
		return res.status(200).json({ success: true })
	})
})

router.post('/login', (req, res) => {
	User.findOne({ phone: req.body.phone }, (err, user) => {
		if (!user)
			return res.json({
				loginSuccess: false,
				message: '该账号不存在！'
			})

		user.comparePassword(req.body.password, (err, isMatch) => {
			if (!isMatch)
				return res.json({ loginSuccess: false, message: '密码错误' })

			user.generateToken((err, user) => {
				if (err) return res.status(400).send(err)
				res.cookie('w_authExp', user.tokenExp)
				res.cookie('w_auth', user.token).status(200).json({
					loginSuccess: true,
					message: '登录成功',
					userId: user._id
				})
			})
		})
	})
})

router.post('/auth', auth, (req, res) => {
	console.log('auth')
	res.status(200).json({
		isAdmin: req.user.role !== 0,
		isAuth: true,
		email: req.user.email,
		username: req.user.username,
		_id: req.user._id,
		role: req.user.role,
		avatar: req.user.avatar
	})
})

router.post('/logout', auth, (req, res) => {
	User.findOneAndUpdate(
		{ _id: req.user._id },
		{ token: '', tokenExp: '' },
		(err, doc) => {
			if (err) return res.json({ success: false, err })
			return res.status(200).send({
				success: true
			})
		}
	)
})

//获取所有（标识在线）用户
router.post('/getUsers', async (req, res) => {
	const { uid } = req.body
	console.log(req.body)
	try {
		let users = await User.find(
			{ _id: { $ne: uid } },
			{ avatar: 1, username: 1, _id: 0 }
		)
		let cur = await User.find({ _id: uid }, { avatar: 1, username: 1, _id: 0 })

		//按昵称首字母排序
		users.sort((a, b) => a.username.localeCompare(b.username))
		users.unshift(cur[0])
		res.status(200).json({
			count: users.length,
			users
		})
	} catch (error) {
		res.status(500).json('Get Users Failed!')
	}
})
module.exports = router
