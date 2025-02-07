import React, { useContext, useState } from 'react'
import MyButton from '../components/UI/button/MyButton'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import '../styles/auth.css'
import { REGISTRATION_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts'
import { login, registration } from '../http/userAPI'
import { observer } from 'mobx-react-lite'
import { Context } from '..'

const Auth = observer(() => {
	const { user } = useContext(Context)
	const location = useLocation()
	const navigate = useNavigate()
	const isLogin = location.pathname === LOGIN_ROUTE
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const click = async () => {
		try {
			let userData
			if (isLogin) {
				userData = await login(email, password)
			} else {
				userData = await registration(email, password)
			}
			user.setUser(user)
			user.setIsAuth(true)
			navigate(SHOP_ROUTE)
		} catch (error) {
			alert(error.response.data.message)
		}
	}
	return (
		<div className='body__container'>
			<div className='auth__flex'>
				<div className='auth__card'>
					<h2>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
					<form className='auth__card__form'>
						<input
							required
							className='auth__card__input'
							type='email'
							placeholder='Введите ваш email...'
							value={email}
							onChange={e => {
								setEmail(e.target.value)
							}}
						/>
						<input
							required
							className='auth__card__input'
							type='password'
							placeholder='Введите ваш пароль...'
							value={password}
							onChange={e => {
								setPassword(e.target.value)
							}}
						/>
						<div className='auth__card__alt'>
							{isLogin ? (
								<span>
									Нет аккаунта?
									<Link to={REGISTRATION_ROUTE}>Зарегистрироваться</Link>
								</span>
							) : (
								<span>
									Есть аккаунт?
									<Link to={LOGIN_ROUTE}>Авторизоваться</Link>
								</span>
							)}
							<MyButton
								onClick={e => {
									e.preventDefault()
									click()
								}}
							>
								{isLogin ? 'Войти' : 'Регистрация'}
							</MyButton>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
})

export default Auth
