import React, { useContext } from 'react'
import { Context } from '../../..'
import { Link } from 'react-router-dom'
import {
	ADMIN_ROUTE,
	BASKET_ROUTE,
	DEVICE_ROUTE,
	LOGIN_ROUTE,
	REGISTRATION_ROUTE,
	SHOP_ROUTE,
} from '../../../utils/consts'
import classes from './NavBar.module.css'
import logo from './static/logo.png'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import Cart from './cart/Cart'

const NavBar = observer(() => {
	const navigate = useNavigate()
	const { user, device } = useContext(Context)

	const logOut = () => {
		user.setUser({})
		user.setIsAuth(false)
		localStorage.removeItem('token')
	}
	return (
		<header className={classes.nav}>
			<div>
				<Link
					to={SHOP_ROUTE}
					onClick={() => {
						device.setSelectedType({})
						device.setSelectedBrand({})
					}}
				>
					<img src={logo} alt='logo' />
				</Link>
			</div>

			{user.isAuth ? (
				<ul>
					<li>
						<Link to={ADMIN_ROUTE}>Админка</Link>
					</li>
					<li>
						<Link to={SHOP_ROUTE}>Главная</Link>
					</li>
					<li>
						<Link to={LOGIN_ROUTE} onClick={logOut}>
							Выйти
						</Link>
					</li>
				</ul>
			) : (
				<ul>
					<li>
						<Link to={LOGIN_ROUTE}>Авторизация</Link>
					</li>
					<li>
						<Link to={SHOP_ROUTE}>Главная</Link>
					</li>
				</ul>
			)}
			<Cart></Cart>
		</header>
	)
})

export default NavBar
