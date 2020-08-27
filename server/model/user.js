const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const eventBus = require('../utils/eventBus')
const userSchema = mongoose.Schema({
	phone: {
		type: Number,
		maxLength: 11,
		unique: 1
	},
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
	role: {
		type: Number,
		default: 0
	},
	avatar: {
		type: String,
		default:
			'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUTExISFRUWExUTFxUXFRYSFxIYFxcXGBUZFRcYHSggGBsnGxgXIjEhJSsrLi4uFx8zODMsNygtLisBCgoKDg0OGhAQFS0dHh0tKy0rLTctLS0tKy0tLi0tLS0rLS0tKy0tLS0tKy0tKy0tLS0tLS0tKy0tLS0tNy0tLf/AABEIAOEA4AMBIgACEQEDEQH/xAAcAAEAAgIDAQAAAAAAAAAAAAAABgcBAgMFCAT/xABDEAABAwICBwQGBggGAwAAAAABAAIDBBEFIQYHEhMxQVEiYXGBFDJCYnKRI1KCkqGxFTNDY4OissEXJFOTs/BE4fH/xAAXAQEBAQEAAAAAAAAAAAAAAAAAAQID/8QAHBEBAQACAwEBAAAAAAAAAAAAAAECESExQVES/9oADAMBAAIRAxEAPwC6UREBERAREQEQlQDSrWpSUxMdOPSZb7PZNomnhYye2b8m36XCsmxP1GMb0+w6lJa+oa94NjHF9M4HodnJp+IhQJuDY5i/aqJDS07uDCHRNII5QA7b/wCIR3KVYHqqw+AAyMdUPHOU9jyibZtu520rqTsdBU63pZnFlDQPkPV+1I4HleKEH+pcYn0oquDRTtPuwwj+fakCtilpmRtDY2MY0cGsaGAeQyXKm58FRjQLHJjebEy3ubU1Dv5WhrVt/hRWn1sVd92Z35yhW0ifqipf8KK0erirvuzN/KUrU6BY5Cbw4mXdzqmoaPuuDmq3ET9UVEZ9KKXi0VDR7sMw+TNmQrkptb0sLgyuoHxnqzajcTztFMB/UrZXFU0zJGlsjGPaeLXtDwfI5JufBHcD0+w6qIayoax5yEcv0Lieg2snH4SVJ1Bsc1VYfOCY2OpnHnEex5xOu23w7KipwbHMIzp5PSqdvFgBkAA6wOO2z+GT3pqXoXGigGiutSkqSI6gejS32e0bxOPCwk9k35Ot0uVPwVLNAiIoCIiAiIgIiICIiAuo0l0kpqCLeVD7XuGMGb5T0Y3n4mwHMhdTp7pzDhzNnKSoc27Ir2DR9eU+yz8TbLmRDtFtBqjEZfT8Uc8h1nNhN2ue3i0OH7KLowWJ4m2e1qT2j45KrFNIHFsY9Hotogm52DbK0jhYzv8AdFmjnbirC0T0Eo6CzmM3k3+vIA54+AcIx4Z9SVJIIWsaGMa1rWgNa1oDWtA4AAZALkUtBERQEREBERAREQEREBERBF9LNBKOvu57N3NynjAa8/GOEg8c+hCr6OqxTR9wbIPSKLaABudgA5WY43MDuHYN2nlc5q6Vxzwte0se1rmuBa5rgHNcDxBByIVlHWaNaR09dFvad97ZPYcnxHo9vLx4HkSu3VRaU6D1GHSmvwtzwG3c+EXe5jeLg0ftYurDcjiL5bMx0D04hxFlsmTtbd8V73H14z7TPxF8+RNs9gliIiyCIiAiIgKI6w9NWYbD2dl1RIDu2Hg0c5JPdHT2jllmR2+lekEVBTOnkzt2WM4GV59Vo/MnkATyVb6vNHJcRqHYpXdtpfeJp9WRzTkQ08ImWs0cyO7tak9o+vV3oK+R/wCkcR2nyvdvY45MzfiJZh14bLODQBlewbaiIpbsERFARFguQZRYJWLoNkUbx7TWhoyWy1DdscY2AyyA+81vq/asojVa6IB+qpJn58XvZFfybtK6otJFUsOuoX7dCQPdnBPyMYXfYTrYw+YgSGWnJNvpGXb9+MuAHebJ+aJ4i4aSqjlYJI3skY4Xa9jg9rvAjIrmUBERAREQFVmsPQaSJ/6Rw7aZKx28kjj434ulibzPHaZwcL5XuHWmisuhE9XumbMShz2W1DAN6wcDfhJH7h6cjl0JliqHWFo7Lh1Q3FKEbLQ+8zB6rHOOZLRxifwcORIPPs2Rovj8VdTsnjuA7JzDxjePWafDrzBB5q2ewdsiwStVkbrBPX/4sqvdcukno1KKdhtJUgtNuLYR+sPi64Z4F3RWTYitZI/SDFBGwuFHBfMG30d+08W9uQgBvRoB5FXRTwNjY1jGhrGNDWtAsGtAsAB0sovq40b9Ao2tc36aS0s3UOI7LPBoy8do81KHOKWjkWAVoVlgUGdpYJWQ1Zsg1ssgFbIg+auq44Y3SyvDI2Dac52QaP8AvLmqO011mT1RdFTF0FPmLg2lmHVzh6jT9VufU8hxa0dMTWzmGJ3+WhcQLcJpBk6Q9QMw3uueeUHXTHEYAWURaQREQdngGP1NFJvKaUsJ9ZvrRydz2HJ3jxHIhXvoLp1DiLdmwiqGi74ib7Q5viPtN6jiOfInzquehrJIZGSxPLJGODmuHFpH5i1wRwIJClmx6wRdBobpI2vpmzABrx2JWA32JAMwPdORHcQu7JP5rkrkusXXGRwW7QgbSwSshqzZBwzwNkY5j2hzHNLXNIuHNcLEEcxYlU9RTOwDE909zvQ57WcTcBl+y839uMnZd1ab9AroUW1j6M+n0bmtF5oryw97gM2eDhl47J5KyiTgea2soBqd0k9JpNxIby02yzPi6I/qyb8xYsPwi/FT9LNAqWwEfpjHH1B7VPTkPbzBZGSKcfafeTycFP8AWdjHouHTOabPkAgZnY3kycR3hm2fJdbqZwfcUAlIs+oeZPsN7MQ8LAu+2rOJsTpzUDFsiyMALKIgIiICiGtPHTSYfJsG0kxFOw8xtg7bh0IYHWPWyl6pvX1WEzUsN8mxySkd73BrSfuO+ZVx7FVgLKIuqCIiAiIgIiIJ1qjx3cVzYSexUDdG5yEjQTEfndv8RX3sBeTqaqMT2St4xvbKPFjg4fiF6ya8EAjgQCPA8FjOKyiIsAiIgIiIKZxofofHWTjs09SS53IBshAnH2ZNmTwICuZQPXNg2/w8ygXfTvEv2D2ZR4WId9hdrq2xg1WHQPcbvY3cvJ4l0fZue8t2XfaWrzNiD68Kt0s9JRMI2j27e/K7dQ/lJ81bFDSthjZEwWbGxsbR3MAaPwCqKe9VpOARdsMjfIQQ7f8Ay3+auRL1AREWQREQEREBUZrzYf0hEeRo4wPETT3/ADCvNVNr6w8ltLUDgHSQOy+sA9nh6j/mtY9ioURF0QREQEREBERBpL6p8CvWWHtIijB4iNgP3QvL2BYeampggAvvZmMPwlw2z5N2j5L1SVjNRERYBERAREQcNbStljfE8XbIx0bh1DgWn8Cqp1HVTopayieRtNO8t70btzMf+NW4qdpr0ulDhazZ3OHiJod5/wArVqdUa6sGmXG62Ym9vSnffqG2/C4VyKnNRjtqprH8SY4zf4pHk/krjTLsERFkEREBERAXTaYYGK2jlp8g5zbsJ9mRp2oye7aAB7iV3KIPJUsTmOcx7S1zXFrmni1zTZwPeCCFqri1t6CukJrqZl32+niaLueALbxgHFwAsRzABGYzpwFdpdoyiIgIiICIu90P0WmxGcRx3axtjLLa4ib+ReeTf7AoJnqQ0eL5X1z29mMGKK/tSOFpHD4WnZv77uiudfJhWHRU0LIIW7McbQ1o4+JJ5km5J5klfWuVu6oiIoCIiAiIgKnNZoMWN0MwNr+ik/YqHB38psrjVO683bNTRPHEMkN/hkYR+a1j2NdRAtUVjf3UX8r3j+6uRUxqpfu8YrIu6qZ5x1DR+V1c6ZdgiIsgiIgIiICIiAq7021XxVRdNSlsExu5zSLRTOOdyBnG4n2gCDfME5qwpZGtBc4hrQLlxIAA6knIKE43rTw6C7WPfUOHKEAs/wBxxDSPhurN+ClMd0dqqMkVED4xe23bajdnYWkbdufS9+5dWrLxPXJVPuIaanjBy+kL5yR4DYA/FQfE8ckncXOjpWk8THSwRk95cGbR+a6zaOsW0ETnuDGNc954MY0vcfBrcyto5y03AZ9qNjx8nNIKk2C6wa6lbsxejBvT0aGMfKEMQdzorqpqpyH1V6aLjs5GZ47m5iPxdn7qufBsJhpImwwRiNjeQzJPNzic3OPMnNVVhmuiQWFRSMcOboXlh8mPvf7wU4wHWHh9UQ1s26kNvo5hunXPIOJ2HHuBKxltUqREWAREQEREBERAVNa+c56Qfupfxewf2Vyql9bT95i9HD0bTt85ahw/Ky1j2ER9F0nItZssxHiKiG9/9x1vJXQqZ1107oK2lrGA3LBbpt08ge2/eQ8fdVw0lQ2VjJGm7Xsa9p6hwBH4FMvByoiLIIiICIiAoLpprKp6IuiiAnqBkWg2jiP7x44n3Rn12VFdY2ssvLqaheQzNslQ02L+rYTyb74zPLLM1WAtzH6O30h0lq6516iYuF7iMdmJnwsGXmbnvXUoi2giIgIiICwQsogk2i+nVbQ2ayTeRD9jIS5lvcPGPyy7irr0P02pcQFozsTAXdA8jbAHEsPB7e8cL5gLzct4JnMc17HOa9p2muaS1zSObSMwVLjKPWiKutW2sQVezTVRDam1mPya2pt3cGyW4jgeItwFirnZpRERQEREBUpXH0rSdjbXbHOwDnb0eLeG/wDEaVc9TO2NjpHGzWNc9x6BoJP4BUzqYhdUYhU1jr3DHuPPt1Ehdx7g1481rH2ia638J3+HPeBd1O4VA+Ft2yfyOcfshcep3F9/h7Yye3TuMJ+D1oj4bJ2fsFTeWMOaWuALXAtIPAgixB8lSOg8xwnGJKOQ2jld6Pc87napX3PG+0G+Mh6JOZoXgiIsgiIgKo9b2m5u6gp3W5VEgPX9i0/1fd+spprD0n9ApHPYRvpDu4QeTiM3nuaM/Gw5rzmWkkkkk3JJJuXEnMkniSc7reM9GiALcgW7+HmskjPlex/9LaNGi6y1o+ZssA2TaPLJByNA8wT52XG/ibLCICIiAiIgIiIDSQQQSCCCCCQQRmCCMwQeav7Vhpp6dEYpnD0mJo2uW+ZwEgHXgHAcyDleyoFfbguKS0s8dREbPjdtAcnDg5rvdcLg+Klmx6qRfDg+KR1MEc8Z7EjQ4X4t+s094Nwe8FfYSuStli61WQghWt/GNxh74we3UEQDn2T2pf5ARf3guLU7hO4oBIfWqHmX7NgyPysC77ShOsGsdieLR0URBbG/0cEZ2eTeoeM/ZDbEfuSrspKVkTGRsFmMa1jR0a0WaPkFq8Qcyq3Xdo6XxsrowdqK0ctsjuyfo33GfZebeD78laS4qqnZIx0cjQ5j2ljmnMOa4WcD4gqS6Ee1f6Siuo2SOP0rPo5h77R61ujhZ3mRyUjc9UbQTvwDEnRSFxp32BNr7yFx7Eg6vYdoEfFlmFeERDmhzXAtIBBBuHAgEEHmDxTKDJJWWLYNXV6U4p6LRz1GV44nObfIF5Fox5vLR5qCjtaePelVz2tN44CYGdLtP0rh4uFvBjVENs8Vr4kk9TmT3k9UXbSF0REBERAREQEREBERBtuytmRj8FtvR3rjDzwQbMGZCw4538CtSVhBbeo/HbmWiccrb+L5gSt6c2G3xFW3srzDobifotdTTXsGyta7O3Yf2H3+y4nyXp8rnlOVFHNPtIxQUb5QRvXfRwg53kcMjbmGi7j8NuakMjw0FziAACSSbAAZkk8gqFx6ulx7E2QwkiFpLIz9SIEb2cjqcrA+4MimM2JDqQ0fJ3lfJck7UMROZdn9NJfmSRs345P6q218+HUUcETIYm7McbGsaONg0WFzzPU819Clu6CIigjGsDRNuI02yLCaO74XnKzrZscfqusAehAPJQfVRpe6B/6Nq9phDyyEvyMb75wP6Z+ryvlzarfVda0tA/S2mqpm/wCYaO2wZekNHC37wDgeYy6W1L5RYqr3XhWbGHtjH7aojafhYHSf1MYvl1Y6wd8G0dW6047Mcjst9bLYffhKOGfrePH4dfs9m0cfU1D/ALoiA/rKSciokRF0QREQEREBERAREQEREBERAREQYeLgjuXqjR6s39LTzf6kEUnm5gJ/ErywrFrNYm5wumpKZxEvo4ZLLw3IFxssP1yPa9kHLPhnKbHY629NN4Th9MS4bQZO5ue8dewgZb1s7bVuJ7P1gphq00Q/R9PtSAekSgOkOR3Y9mMHuvmeZJ5AKPap9AzFs1tUy0hF4InDOIEfrHg8HkcB7IOeZs20lm3yKIiLIIiICIiCuNZOroVV6qkAbUcXx5NFRbmDwbL38DztxVU6RaQVNSyGKquZKbes2nAtkIfu+zKD7TTHx4m+eYufTqiWmugVNiA2z9FUBtmzNF9roJW+2PkRyK3Mvo86ou20k0bqaGTd1Eezc9iQdqOX4Hf2NiOi6lbQREQEREBERAREQEREBERARF9uD4TPVSiGnjdI88hwaPrPccmN7z+eSD4gOXEkgAcSScgAOZVxat9W27Lautb2xZ0UBzEZ4h8o5v6N5cTnbZ7zQTVzDQ7M02zNU8Q63YhvyiB4nltnPpa5CnKxcviiIiwCIiAiIgIiICIiD56+hinjdFNGySN3FjgHA9Mjz7+SqjSrVAReSgfccdxK7Md0cp4+D/vK30Vl0PKOJYfNTv3c8T4n/Ve0tJ728nDvFwvmXq7EMPhnYY5oo5WH2XtDx+PA96gON6n6SS5p5JKd2fZ/XR38HHaHk7yW5mKPRTnFdVGIxXMbYp28t28NcR3tk2beAJUYrtH6yH9bS1LB9Z0Tw371tn8VraOtRaCVp4OHzC2BVGURYJUGUXJSUz5TaKOSUjlGx0h+TQSpRherfE5//H3Q+tM4RDzbm/8AlQRNclNA+RwZGxz3u4MY0vc7waMyrfwXU1E2zqqodJ+7iG6b4F5u4+WyrDwbAqakbs08EcQPEtHad8Tz2neZWblBUmi2qSeWz6x24Zx3TSHSu+I5tj/E9wVu4Lg1PSRiKnibGznbMuPV7jm495JX3osW2qIiKAiIgIiICIiAiIgIiICIiAiIgLeNEQQ3TTiPiVSaa/8AfmiLeIiSk2g3613giLdR6FwL9Q3w/sF9iIuKiIiAiIgIiICIiAiIg//Z'
	},
	token: {
		type: String
	},
	tokenExp: {
		type: Number
	}
})

userSchema.pre('save', function (next) {
	const user = this
	if (user.isModified('password')) {
		bcrypt.genSalt(10, (err, salt) => {
			if (err) return next(err)
			bcrypt.hash(user.password, salt, (err, hash) => {
				if (err) return next(err)
				user.password = hash
				eventBus.updateUserEmmiter()
				// updateUser.emit('updateCurrentUser', () => {})
				next()
			})
		})
	} else {
		next()
	}
})

userSchema.methods.comparePassword = function (plainPassword, cb) {
	bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
		if (err) return cb(err)
		cb(null, isMatch)
	})
}

userSchema.methods.generateToken = function (cb) {
	const user = this
	const token = jwt.sign(user._id.toHexString(), 'secret')
	user.tokenExp = 1000 * 60 * 60
	user.token = token
	user.save((err, user) => {
		if (err) return cb(err)
		cb(null, user)
	})
}

userSchema.statics.findByToken = function (token, cb) {
	const user = this
	jwt.verify(token, 'secret', (err, decode) => {
		user.findOne({ _id: decode, token: token }, (err, user) => {
			if (err) return cb(err)
			cb(null, user)
		})
	})
}

const User = mongoose.model('users', userSchema)
module.exports = User
