import React, { useContext, useEffect } from 'react'
import '../styles/shop.css'
import TypeBar from '../components/UI/typeBar/TypeBar'
import BrandBar from '../components/UI/brandBar/BrandBar'
import DeviceList from '../components/UI/deviceList/DeviceList'
import { observer } from 'mobx-react-lite'
import { Context } from '..'
import { fetchBrands, fetchDevices, fetchTypes } from '../http/deviceAPI'
import Pagination from '../components/UI/pagination/Pagination'

const Shop = observer(() => {
	const { device } = useContext(Context)

	useEffect(() => {
		fetchTypes().then(data => device.setTypes(data))
		fetchBrands().then(data => device.setBrands(data))
	}, [])

	useEffect(() => {
		fetchDevices(
			device.selectedType.id,
			device.selectedBrand.id,
			device.targetPage,
			device.limit
		).then(data => {
			device.setDevices(data.rows)
			device.setTotalCount(data.count)
		})
	}, [device.targetPage, device.selectedType, device.selectedBrand])

	return (
		<div className='body__container shop__flex'>
			<TypeBar />
			<div className='shop__assortment'>
				<BrandBar />
				<DeviceList />
				<Pagination />
			</div>
		</div>
	)
})

export default Shop
