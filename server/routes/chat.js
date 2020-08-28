const express = require('express')
const router = express.Router()
const path = require('path')
const Chat = require('../model/Chat')

const auth = require('../middleware/auth')

const multer = require('multer')
const storeageImage = multer.diskStorage({
	destination: path.join(__dirname + '/../public/images'),
	filename(req, file, cb) {
		cb(null, `${Date.now()}_${file.originalname}`)
	}
})
const storeageVideo = multer.diskStorage({
	destination: path.join(__dirname + '/../public/videos'),
	filename(req, file, cb) {
		cb(null, `${Date.now()}_${file.originalname}`)
	}
})
const uploadImage = multer({ storage: storeageImage }).array('images', 12)
const uploadVideo = multer({ storage: storeageVideo })

router.post('/getChats', async (req, res) => {
	await Chat.find({}, { __v: 0 })
		.populate('sender', 'username avatar _id')
		.exec((err, chats) => {
			if (err) return res.status(400).send(err)
			res.status(200).send(chats)
		})
})

router.post('/uploadImages', auth, (req, res) => {
	uploadImage(req, res, (err) => {
		if (err) return res.json({ success: false, err })
		const paths = []
		req.files.map((item) => {
			return paths.push(item.filename)
		})
		return res.json({ success: true, paths })
	})
})

router.post('/uploadVideos', (req, res) => {
	console.log(req.body)
})
module.exports = router
