const { Type } = require('../models/models')
const ApiError = require('../error/ApiError')

class TypeController {
	//Создать Тип
	async create(req, res, next) {
		try {
			const { name } = req.body
			const type = await Type.create({ name })
			return res.json(type)
		} catch (error) {
			next(ApiError.badRequest(error.message))
		}
	}
	//Получить все типы
	async getAll(req, res, next) {
		try {
			const types = await Type.findAll()
			return res.json(types)
		} catch (error) {
			next(ApiError.badRequest(error.message))
		}
	}
	//Получить Один Тип
	async getOne(req, res) {
		const { id } = req.params
		const type = await Type.findOne({
			where: { id },
		})
		return res.json(type)
	}

	//Удалить Тип
	async deleteType(req, res) {
		try {
		} catch (error) {}
	}
}

module.exports = new TypeController()
