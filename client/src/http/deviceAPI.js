import { $authHost, $host } from './index'
import { jwtDecode } from 'jwt-decode'

//Создание Типа
export const createType = async type => {
	const { data } = await $authHost.post('api/type', type)
	return data
}

//Получение Типов
export const fetchTypes = async () => {
	const { data } = await $host.get('api/type')
	return data
}

//Создание Бренда
export const createBrand = async brand => {
	const { data } = await $authHost.post('api/brand', brand)
	return data
}

//Получение Брендов
export const fetchBrands = async () => {
	const { data } = await $host.get('api/brand')
	return data
}

//Создание девайса
export const createDevice = async device => {
	const { data } = await $authHost.post('api/device', device)
	return data
}

export const fetchDevices = async (typeId, brandId, page, limit) => {
	const { data } = await $host.get('api/device', {
		params: {
			typeId,
			brandId,
			page: page,
			limit,
		},
	})
	return data
}

export const fetchSoloDevice = async id => {
	const { data } = await $host.get(`api/device/${id}`)
	return data
}

export const deleteDevice = async id => {
	const { data } = await $authHost.delete(`api/device/${id}`)
	return data
}
