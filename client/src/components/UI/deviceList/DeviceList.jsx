import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../../..'
import DeviceItem from './deviceItem/DeviceItem'
import classes from './DeviceList.module.css'

const DeviceList = observer(() => {
	const { device } = useContext(Context)
	return (
		<div className={classes.device__grid}>
			{device.devices.map(item => (
				<DeviceItem key={item.id} device={item} />
			))}
		</div>
	)
})

export default DeviceList
