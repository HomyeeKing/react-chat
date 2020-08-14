var Mock = require('mockjs')

var data = Mock.mock({
	'shopList|5-8': [
		{
			'id|+1': 0,
			'itemName|+1': '商品',
			'price|10-50': 20
		}
	]
})

export default data
