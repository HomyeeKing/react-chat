const Events = require('events')
const ev = new Events()
const UPDATE_USER = 'update_user'
module.exports = {
	updateUserRegister(fn) {
		ev.on(UPDATE_USER, () => {
			console.log('dispatch event through socket to let client to update')
			console.log(ev.listenerCount(UPDATE_USER))
			fn.apply(this, arguments)
		})
	},
	updateUserEmmiter() {
		ev.emit(UPDATE_USER)
	},
	getAllListeners() {
		console.log(ev.listenerCount(UPDATE_USER))
	}
}
