var express = require('express')
var router = express.Router()

/* GET users listing. */
router.get('/', function (req, res, next) {
	res.send('respond with a resource')
})

router.post('/auth', (req, res) => {
	res.send('auth')
})
router.post('/login', (req, res) => {
	res.send({ payload: 'login' })
})
module.exports = router
