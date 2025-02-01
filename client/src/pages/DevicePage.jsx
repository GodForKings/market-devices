import React, { useContext, useEffect, useState } from 'react'
import '../styles/devicePage.css'
import MyButton from '../components/UI/button/MyButton'
import { useParams } from 'react-router-dom'
import { fetchSoloDevice } from '../http/deviceAPI'
import { Context } from '..'
import { observer } from 'mobx-react-lite'

const DevicePage = () => {
	const { basket } = useContext(Context)
	const [device, setDevice] = useState({ info: [] })
	const { id } = useParams()
	useEffect(() => {
		fetchSoloDevice(id).then(data => setDevice(data))
	}, [])
	const imgDevice = `${process.env.REACT_APP_API_URL}${device.img}`
	const deviceInCart = () => {
		if (!basket.cart.some(item => item.id === device.id)) {
			basket.setCounter(basket.counter + 1)
			basket.setCart(device)
			console.log(basket.cart)
		}
	}

	return (
		<div className='body__container'>
			<div className='device__flex'>
				<div className='device__img'>
					<img src={imgDevice}></img>
				</div>
				<div className='device__desc'>
					<h3>{device.name}</h3>
					<div>{device.rating}</div>
					<h4>О товаре</h4>
					<div>
						{device.info.map(item => (
							<div key={item.id}>
								{item.title} : {item.description}
							</div>
						))}
					</div>
				</div>
				<div className='device__add'>
					<div className='device__price'>
						<span>{device.price}₽</span>
					</div>
					<MyButton onClick={deviceInCart}>Add to Basket</MyButton>
				</div>
			</div>
		</div>
	)
}

export default DevicePage
