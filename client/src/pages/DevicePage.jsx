import React, { useContext, useEffect, useState } from 'react'
import '../styles/devicePage.css'
import MyButton from '../components/UI/button/MyButton'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchSoloDevice } from '../http/deviceAPI'
import { Context } from '..'
import { observer } from 'mobx-react-lite'
import { SHOP_ROUTE } from '../utils/consts'
import addDeviceToCart from '../utils/addDeviceToCart'
import DeviceBaseInfo from '../components/UI/devicePageInfo/DeviceBaseInfo'

const DevicePage = () => {
	const navigate = useNavigate()
	const { id } = useParams()
	const { basket } = useContext(Context)
	const [device, setDevice] = useState({ info: [] })

	useEffect(() => {
		fetchSoloDevice(id).then(data => {
			if (!data) {
				navigate(SHOP_ROUTE)
			} else {
				setDevice(data)
			}
		})
	}, [])

	const imgDevice = `${process.env.REACT_APP_API_URL}${device.img}`

	return (
		<div className='body__container'>
			<div className='device__flex'>
				<div className='device__img'>
					<img src={imgDevice} alt='Изображение устройства'></img>
				</div>
				<DeviceBaseInfo item={device}></DeviceBaseInfo>
				<div className='device__add'>
					<div className='device__price'>
						<span>{device.price}₽</span>
						<MyButton onClick={() => addDeviceToCart(basket, device)}>
							Add to Basket
						</MyButton>
					</div>
				</div>
			</div>
			<dl>
				{device.info.map(item => (
					<div key={item.id}>
						<dt>{item.title}</dt>
						<dd>{item.description}</dd>
					</div>
				))}
			</dl>
		</div>
	)
}

export default DevicePage
