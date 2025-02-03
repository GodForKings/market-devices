export default function deviceInCart(basket, device) {
	if (!basket.cart.some(item => item.id === device.id)) {
		basket.setCounter(basket.counter + 1)
		basket.setCart(device)
	}
}
