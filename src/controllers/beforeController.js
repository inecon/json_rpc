const User = require('../models/user')
const Car = require('../models/car')
const isValidRequestData = require('../utils/isValidRequestData')

const beforeController = {
    async setCar(params) {
        const rules = [{name: "brand", minMax: [3, 16]}, {name: "model", minMax: [3, 16]}, {name: "color", minMax: [3, 16]}]
        const error = isValidRequestData(params, rules)
        throw error

    },
    async getUsersByCarId(params, _, raw) {
        const car = await Car.findById(params._id)
        if (!car) {
            const error = new Error(`Car with ID = ${params._id} not found`)
            error.data = {params}
            throw error
        }
    }
}

module.exports = beforeController