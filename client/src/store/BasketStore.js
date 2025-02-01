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
	//computed fnc
	get counter() {
		return this._counter
	}

	get cart() {
		return this._cart
	}
}
