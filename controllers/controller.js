const User = require('../models/user')
const Car = require('../models/car')

const controller = {
    async getCars() {
        try {
            return await Car.find()
        } catch (e) {
            console.log(e)
        }
    },
    async getCarById({_id}) {
        try {
            return await Car.findById(_id)
        } catch (e) {
            console.log(e)
        }
    },
    async getUsers() {
        try {
            return await User.find().populate('car')
        } catch (e) {
            console.log(e)
        }
    },
    async getUserById({_id}) {
        try {
            return await User.findById(_id).populate('car')
        } catch (e) {
            console.log(e)
        }
    },
    async setCar({brand, model, color}) {
        try {
            const car = new Car({brand, model, color})
            return await car.save()
        } catch (e) {
            console.log(e)
        }
    },
    async setUser({name, surname, password, car}) {
        try {
            const savedCar = await Car.findById(car._id)
            if (savedCar) {
                const user = new User({name, surname, password, car: savedCar._id})
                return await user.save()
            } else {
                throw new Error(`There no car with id ${car._id}`)
            }
        } catch
            (e) {
            console.log(e)
        }
    }
}

module.exports = {controller}