import React, { useContext } from 'react'
import style from './BasketContent.module.css'
import { Context } from '../../..'
import { observer } from 'mobx-react-lite'
import MyButton from '../button/MyButton'
import { DEVICE_ROUTE } from '../../../utils/consts'
import { useNavigate } from 'react-router-dom'

const BasketContent = observer(() => {
	const { basket } = useContext(Context)
	const navigate = useNavigate()
	const formatter = new Intl.NumberFormat('ru-RU')
	return (
		<div className={style.content__box}>
			<div className={style.basket__container}>
				{!basket.cart.length ? (
					<h1>Ваша корзина сейчас пуста</h1>
				) : (
					basket.cart.map(item => (
						<div className={style.basket__item} key={item.id}>
							<img
								onClick={() => navigate(`${DEVICE_ROUTE}/${item.id}`)}
								src={`${process.env.REACT_APP_API_URL}${item.img}`}
							/>
							<span>{item.name}</span>
							<div className={style.basket__counter}>
								<MyButton
									disabled={item.quantity < 2}
									onClick={() => basket.decrementDevice(item)}
								>
									-
								</MyButton>
								<span>{item.quantity}</span>
								<MyButton
									disabled={item.quantity > 14}
									onClick={() => basket.incrementDevice(item)}
								>
									+
								</MyButton>
							</div>
							<div className={style.basket__price}>
								<span>{formatter.format(item.quantity * item.price)}₽</span>
								<button
									onClick={() => {
										basket.deleteDeviceInCart(item)
									}}
									className={style.basket__priceDelete}
								></button>
							</div>
						</div>
					))
				)}
			</div>

			<div className={style.finalPrice}>
				<MyButton>перейти к оформлению</MyButton>
				<span>Сумма вашего заказа: {formatter.format(basket.finalPrice)}₽</span>
			</div>
		</div>
	)
})

export default BasketContent
