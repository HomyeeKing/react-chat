const express = require('express')
const router = express.Router()
const Chat = require('../model/Chat')

router.post('/getChats', async (req, res) => {
	await Chat.find({}, { __v: 0 })
		.populate('sender', 'username avatar _id')
		.exec((err, chats) => {
			if (err) return res.status(400).send(err)
			res.status(200).send(chats)
		})
})

module.exports = router
