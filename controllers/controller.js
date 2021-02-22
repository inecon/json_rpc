const User = require('../models/user')
const Car = require('../models/car')

const controller = {
    async getCars() {
        try {
            const cars = await Car.find()
            if (cars.length) {
                return cars
            } else {
                return {"info" : "Cars not found at DB"}
            }
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
            const users = await User.find().populate('car')
            if(users.length){
                return users
            } else {
                return {"info" : "Users not found at DB"}
            }
        } catch (e) {
            console.log(e)
        }
    },
    async getUserById({_id}) {
        try {
            const user = await User.findById(_id).populate('car')
            if(user) {
                return user
            } else {
                return {"result" : "User not found at DB"}
            }
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