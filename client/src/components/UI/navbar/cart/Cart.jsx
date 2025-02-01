import React, { useContext } from 'react'
import classes from './Cart.module.css'
import cart from '../static/cart.png'
import { Link } from 'react-router-dom'
import { BASKET_ROUTE } from '../../../../utils/consts'
import { observer } from 'mobx-react-lite'
import { Context } from '../../../..'

const Cart = observer(() => {
	const { basket } = useContext(Context)
	return (
		<div className={classes.cart}>
			<Link to={BASKET_ROUTE}>
				<div className={classes.counter}>{basket.counter}</div>
				<img src={cart} alt='cart-img'></img>
			</Link>
		</div>
	)
})

export default Cart
