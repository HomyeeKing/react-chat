module.exports = function (server) {
	const io = require('socket.io')(server)
	const Chat = require('../model/Chat')
	io.on('connection', (socket) => {
		socket.on('backend-message', ({ msg, _id, type = 'text' }, callback) => {
			try {
				let chat = new Chat({
					message: msg,
					sender: _id,
					type
				})
				chat.save((err, doc) => {
					if (err) return
					Chat.find({ _id: doc._id })
						.populate('sender', 'username avatar _id')
						.exec((err, doc1) => {
							if (err) throw err
							console.log(doc1)
							callback(0)
							return io.emit('front-message', {
								message: doc1[0].message,
								sender: doc1[0].sender,
								type: doc1[0].type,
								_id: doc1[0]._id
							})
						})
				})
			} catch (error) {
				throw error
			}
		})
	})
}
