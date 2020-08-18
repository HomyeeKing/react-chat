const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userSchema = mongoose.Schema({
	username: {
		type: String,
		maxlength: 50
	},
	email: {
		type: String,
		trim: true,
		unique: 1
	},
	password: {
		type: String,
		minglength: 5
	},
	lastname: {
		type: String,
		maxlength: 50
	},
	role: {
		type: Number,
		default: 0
	},
	image: String,
	token: {
		type: String
	},
	tokenExp: {
		type: Number
	}
})

userSchema.pre('save', function(next) {
	const user = this
	if (user.isModified('password')) {
		bcrypt.genSalt(10, (err, salt) => {
			if (err) return next(err)
			bcrypt.hash(user.password, salt, (err, hash) => {
				if (err) return next(err)
				user.password = hash
				next()
			})
		})
	} else {
		next()
	}
})

userSchema.methods.comparePassword = function(plainPassword, cb) {
	bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
		if (err) return cb(err)
		cb(null, isMatch)
	})
}

userSchema.methods.generateToken = function(cb) {
	const user = this
	const token = jwt.sign(user._id.toHexString(), 'secret')
	user.tokenExp = 1000 * 60 * 60
	user.token = token
	user.save((err, user) => {
		if (err) return cb(err)
		cb(null, user)
	})
}

userSchema.statics.findByToken = function(token, cb) {
	const user = this
	jwt.verify(token, 'secret', (err, decode) => {
		user.findOne({ _id: decode, token: token }, (err, user) => {
			if (err) return cb(err)
			cb(null, user)
		})
	})
}
module.exports = User = mongoose.model('users', userSchema)
