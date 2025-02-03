import React from 'react'
import style from './DeviceBaseInfo.module.css'

const DeviceBaseInfo = ({ item }) => {
	return (
		<div className={style.device__name}>
			<h2 className={style.device__title}>{item.name}</h2>
			<div>
				Бренд<span>{item.id}</span>
			</div>
			<div>{item.rating}/5</div>
		</div>
	)
}

export default DeviceBaseInfo
