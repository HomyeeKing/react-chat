var express = require('express')
var router = express.Router()

const User = require('../model/user')
/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource')
})

router.post('/register', (req, res) => {
	const user = new User(req.body)
	user.save((err, doc) => {
		if (err) return res.json({ success: false, err })
		return res.status(200).json({ success: true })
	})
})

module.exports = router
