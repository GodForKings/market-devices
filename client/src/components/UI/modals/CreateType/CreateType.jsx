import React, { useState } from 'react'
import MyButton from '../../button/MyButton'
import classes from './CreateType.module.css'
import { createType } from '../../../../http/deviceAPI'

const CreateBrand = ({ showType, setShowType }) => {
	const rootClasses = [classes.createType]
	if (showType) {
		rootClasses.push(classes.active)
	}
	const [type, setType] = useState('')
	const addType = () => {
		createType({ name: type })
			.then(data => {
				setType('')
				setShowType(false)
			})
			.catch(error => {
				console.log(error.response.data.message)
				setType('ВВЕДИТЕ ДРУГОЙ ТИП')
			})
	}

	return (
		<div className={rootClasses.join(' ')}>
			<div
				className={classes.createType__Content}
				onClick={e => e.stopPropagation()} // Отключаем всплытие события
			>
				<h2 className={classes.CreateType__title}>Добавьте Тип</h2>
				<form className={classes.createType__form}>
					<input
						type='text'
						placeholder='Введите Тип'
						value={type}
						onChange={e => {
							setType(e.target.value)
						}}
					/>
				</form>
				<div className={classes.createType__bot}>
					<MyButton onClick={addType}>добавить</MyButton>
					<MyButton
						onClick={() => {
							setShowType(false)
							setType('')
						}}
					>
						закрыть
					</MyButton>
				</div>
			</div>
		</div>
	)
}

export default CreateBrand
