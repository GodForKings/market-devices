import React, { useContext } from 'react'
import style from './BasketContent.module.css'
import { Context } from '../../..'
import { observer } from 'mobx-react-lite'

const BasketContent = observer(({}) => {
	const { basket } = useContext(Context)
	return (
		<div className={style.content__box}>
			<div className={style.basket__container}>
				{basket.cart.map(item => (
					<div key={item.id}>{item.name}</div>
				))}
			</div>
		</div>
	)
})

export default BasketContent
