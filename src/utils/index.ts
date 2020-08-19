export function throttle(fn: any, delay: number) {
	var timer: any = null
	return function () {
		if (!timer) {
			timer = setTimeout(() => {
				clearTimeout(timer)
				timer = null
				fn()
			}, delay)
		}
	}
}
