var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' })
})
router.get('/error', function(req, res, next) {
	res.render('error', { status: 200, stack: '123' })
})
module.exports = router
