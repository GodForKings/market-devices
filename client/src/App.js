import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter'
import NavBar from './components/UI/navbar/NavBar'
import './styles/main.css'
import { observer } from 'mobx-react-lite'
import { Context } from '.'
import Loader from './components/UI/loader/Loader'
import { check } from './http/userAPI'

const App = observer(() => {
	const { user } = useContext(Context)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		setTimeout(() => {
			if (localStorage.getItem('token')) {
				check()
					.then(data => {
						user.setUser(data)
						user.setIsAuth(true)
					})
					.catch(function (error) {
						console.log(error)
					})
					.finally(() => {
						setLoading(false)
					})
			} else {
				setLoading(false)
			}
		}, 1000)
	}, [])

	if (loading) {
		return <Loader />
	}

	return (
		<BrowserRouter>
			<NavBar></NavBar>
			<AppRouter></AppRouter>
		</BrowserRouter>
	)
})

export default App
