import { makeAutoObservable } from 'mobx'

export default class BasketStore {
	constructor() {
		this._counter = 0
		this._cart = []
		makeAutoObservable(this)
	}

	//action fnc
	setCounter(counter) {
		this._counter = counter
	}

	setCart(device) {
		this._cart = [...this._cart, device]
	}

	deleteDeviceInCart(device) {
		this._cart = this._cart.filter(item => item.id !== device.id)
		this._counter--
		localStorage.setItem('cart', JSON.stringify(this._cart))
	}

	preLoading(devices) {
		if (Array.isArray(devices)) {
			this._cart = devices
			this._counter = devices.length
		}
	}

	//computed fnc
	get counter() {
		return this._counter
	}

	get cart() {
		return this._cart
	}
}
