const mapperToResponse = require('../utils/mapper')
const User = require('../models/user')
const Car = require('../models/car')

const controller = {
    async setCar({brand, model, color}) {
        try {
            const car = new Car({brand, model, color})
            let result = await car.save()
            return mapperToResponse({
                data: result,
                error: !result,
                message: result ? '' : "Car not saved to DB"
            })
        } catch (e) {
            return mapperToResponse({
                error: true,
                message: e.toString()
            })
        }
    },
    async getCars() {
        try {
            const cars = await Car.find()
            return mapperToResponse({
                data: cars,
                error: !cars.length,
                message: cars.length ? '' : "Cars not found at DB"
            })
        } catch (e) {
            return mapperToResponse({
                error: true,
                message: e.toString()
            })
        }
    },
    async getCarById({_id}) {
        try {
            const car = await Car.findById(_id)
            return mapperToResponse({
                data: car,
                error: !car,
                message: car ? '' : 'Car not found at DB'
            })
        } catch (e) {
            return mapperToResponse({
                error: true,
                message: e.toString()
            })
        }
    },
    async getCarsByUserId({_id}) {
        try {
            const carsIds = (await User.findById(_id)).cars
            let cars = []
            if (carsIds) {
                for (const car of carsIds) {
                    cars.push(await Car.findById(car._id))
                }
            }
            return mapperToResponse({
                data: cars,
                error: !cars,
                message: cars ? '' : 'Cars not found at DB'
            })
        } catch (e) {
            return mapperToResponse({
                error: true,
                message: e.toString()
            })
        }
    },
    async removeCarById({_id}) {
        try {
            const deletedCar = await Car.findByIdAndDelete(_id)
            return mapperToResponse({
                data: deletedCar,
                error: !deletedCar,
                message: deletedCar ? '' : 'Car not found at DB'
            })
        } catch (e) {
            return mapperToResponse({
                error: true,
                message: e.toString()
            })
        }
    },
    async setUser({name, surname, password, cars = []}, raw) {
        try {
            const user = new User({name, surname, password, cars: raw.ids})
            let result = await user.save()
            return mapperToResponse({
                data: result,
                error: !result,
                message: result ? '' : "User not saved to DB"
            })
        } catch (e) {
            return mapperToResponse({
                error: true,
                message: e.toString()
            })
        }
    },
    async getUsers() {
        try {
            const users = await User.find().populate('car')
            return mapperToResponse({
                data: users,
                error: !users.length,
                message: users.length ? '' : "Users not found at DB"
            })
        } catch (e) {
            return mapperToResponse({
                error: true,
                message: e.toString()
            })
        }
    },
    async getUserById({_id}) {
        try {
            const user = await User.findById(_id).populate('car')
            return mapperToResponse({
                data: user,
                error: !user,
                message: user ? '' : 'User not found at DB'
            })
        } catch (e) {
            return mapperToResponse({
                error: true,
                message: e.toString()
            })
        }
    },
    async getUsersByCarId({_id}) {
        try {
            const user = await User.find({"cars": {$elemMatch: {"_id": `${_id}`}}})
            return mapperToResponse({
                data: user,
                error: !user.length,
                message: user.length ? '' : `Users which contains car with ID - ${_id} not found`
            })
        } catch (e) {
            return mapperToResponse({
                error: true,
                message: e.toString()
            })
        }
    },
    async removeUserById({_id}) {
        try {
            const deletedUser = await User.findByIdAndDelete(_id)
            return mapperToResponse({
                data: deletedUser,
                error: !deletedUser,
                message: deletedUser ? '' : 'User not found at DB'
            })
        } catch (e) {
            return mapperToResponse({
                error: true,
                message: e.toString()
            })
        }
    },
}

module.exports = controller