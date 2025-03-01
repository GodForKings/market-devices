import React from 'react'
import style from './OrderForm.module.css'
import MyButton from '../../button/MyButton'

const OrderForm = () => {
	return (
		<form className={style.orderModal}>
			<input type='text' placeholder='Введите ваше имя' />
			<MyButton>Оформить заказ</MyButton>
		</form>
	)
}

export default OrderForm
