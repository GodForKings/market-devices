import React, { useContext, useState } from 'react'
import Loader from '../components/UI/loader/Loader'
import { Context } from '..'
import { observer } from 'mobx-react-lite'

const Basket = observer(() => {
	const { basket } = useContext(Context)
	const [loading, setLoading] = useState(false)

	if (loading) return <Loader />
	return <div className='body__container'></div>
})

export default Basket
