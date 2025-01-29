import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Context } from '../../..'
import classes from './TypeBar.module.css'

const TypeBar = observer(() => {
	const { device } = useContext(Context)
	const typeClass = [classes.typeBar__item, classes.active]

	return (
		<ul className={classes.typeBar}>
			{device.types.map(type => (
				<li
					className={
						device.selectedType.id === type.id
							? typeClass.join(' ')
							: classes.typeBar__item
					}
					key={type.id}
					onClick={() => {
						device.setSelectedType(type)
						device.setTargetPage(1)
						console.log('rerender')
					}}
				>
					{type.name}
				</li>
			))}
		</ul>
	)
})

export default TypeBar
