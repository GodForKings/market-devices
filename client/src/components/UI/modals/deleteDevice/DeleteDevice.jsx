import React, { useState, useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../../../..'
import classes from './DeleteDevice.module.css'
import Select from '../../select/Select'
import MyButton from '../../button/MyButton'
import { fetchDevices, deleteDevice } from '../../../../http/deviceAPI'

const DeleteDevice = observer(({ showKill, setShowKill }) => {
	const { device } = useContext(Context)
	const [targetDevice, setTargetDevice] = useState({})

	const destroyed = () => {
		if (typeof targetDevice === 'object')
			deleteDevice(targetDevice.id).then(data => {
				console.log(`${targetDevice.name} удален`)
				setShowKill()
			})
		else {
			console.log(targetDevice)
		}
	}
	useEffect(() => {
		fetchDevices().then(data => device.setDevices(data.rows))
	}, [])
	console.log(device.devices)

	const rootClasses = showKill
		? `${classes.deleteDevice} ${classes.active}`
		: `${classes.deleteDevice}`

	return (
		<div className={rootClasses}>
			<Select
				props={device.devices}
				onChange={e => {
					setTargetDevice(
						device.devices.find(item => item.name === e.target.value)
					)
				}}
			>
				Выберите устройство для удаления
			</Select>
			<MyButton onClick={destroyed}>Удалить</MyButton>
		</div>
	)
})

export default DeleteDevice
