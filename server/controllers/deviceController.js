const { Device, DeviceInfo } = require('../models/models')
const uuid = require('uuid')
const path = require('path')
const ApiError = require('../error/ApiError')
const { type } = require('os')
const { where } = require('sequelize')
const { off } = require('process')

class DeviceController {
	// Создать Девайс в БД
	async create(req, res, next) {
		try {
			let { name, price, brandId, typeId } = req.body
			let { info } = req.body
			const { img } = req.files
			let fileName = uuid.v4() + '.jpg'
			img.mv(path.resolve(__dirname, '..', 'static', fileName))

			const device = await Device.create({
				name,
				price,
				brandId,
				typeId,
				img: fileName,
			})

			if (info) {
				info = JSON.parse(info)
				if (Array.isArray(info)) {
					info.forEach(element => {
						DeviceInfo.create({
							title: element.title,
							description: element.description,
							deviceId: device.id,
						})
					})
				}
			}

			return res.json(device)
		} catch (error) {
			next(ApiError.badRequest(error.message))
		}
	}

	//Удалить устройство по id
	async deleteDevice(req, res, next) {
		try {
			let { id } = req.params
			const device = await Device.destroy({
				where: { id },
			})
			return res.json(device)
		} catch (error) {
			next(ApiError.badRequest(error.message))
		}
	}

	// Получить все по типу или бренду

	async getAll(req, res) {
		let { brandId, typeId, page, limit } = req.query
		page = page || 1
		limit = limit || 50
		let offset = page * limit - limit
		let devices

		if (!brandId && !typeId) {
			devices = await Device.findAndCountAll({ limit, offset })
		}
		if (brandId && !typeId) {
			devices = await Device.findAndCountAll({
				where: { brandId },
				limit,
				offset,
			})
		}
		if (!brandId && typeId) {
			devices = await Device.findAndCountAll({
				where: { typeId },
				limit,
				offset,
			})
		}
		if (brandId && typeId) {
			devices = await Device.findAndCountAll({
				where: { typeId, brandId },
				limit,
				offset,
			})
		}
		return res.json(devices)
	}

	// Получить Один по ID
	async getOne(req, res) {
		const { id } = req.params
		const device = await Device.findOne({
			where: { id },
			include: [{ model: DeviceInfo, as: 'info' }],
		})
		return res.json(device)
	}
}

module.exports = new DeviceController()
