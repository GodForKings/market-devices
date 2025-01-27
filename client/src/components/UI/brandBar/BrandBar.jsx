import React, { useContext } from 'react'
import { Context } from '../../..'
import { observer } from 'mobx-react-lite'
import classes from './BrandBar.module.css'

const BrandBar = observer(() => {
	const { device } = useContext(Context)
	const activeBrand = `${classes.brandBar__item} ${classes.active}`

	return (
		<ul className={classes.brandBar}>
			{device.brands.map(brand => (
				<li
					className={
						device.selectedBrand.id === brand.id
							? activeBrand
							: classes.brandBar__item
					}
					key={brand.id}
					onClick={() => {
						device.setSelectedBrand(brand)
					}}
				>
					{brand.name}
				</li>
			))}
		</ul>
	)
})

export default BrandBar
