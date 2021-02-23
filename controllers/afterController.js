const {appendFile} = require('fs').promises

function formatData(data, id = '') {
    return `${id}: ${Date.now()} : ${JSON.stringify(data)}\n`
}

const afterController = {
    async getCars(params, execResult, raw) {
        await appendFile("./logs/cars.log", `try to get cars, quantity of cars - ${execResult.length} : ${Date.now()}\n`)
    },
    async getCarById(_, execResult) {
        await appendFile("./logs/cars.log", `try to get car from DB - ${JSON.stringify(execResult)} \n`)
    },
    async getUsers(_, execResult) {
        await appendFile("./logs/users.log", `try to get users, quantity of users ${execResult.length} \n`)
    },
    async getUserById(_, execResult) {
        await appendFile("./logs/users.log", `try to get user from DB - ${JSON.stringify(execResult)} \n`)
    },
    async removeUserById(_, execResult) {
        await appendFile("./logs/users.log", formatData(execResult, "User deleted -"))
    },
    async setUser(params, execResult) {
        if (execResult) {
            await appendFile("./logs/users.log", formatData(execResult, "User was set"))
        } else {
            await appendFile("./logs/users.log", `ERROR - User - ${JSON.stringify(params)} was not set \n`)
        }
    },
    async setCar(_, execResult) {
        await appendFile("./logs/cars.log", formatData(execResult, "Car was set"))
    },
    async removeCarById(_, execResult) {
        await appendFile("./logs/cars.log", formatData(execResult, "TCar deleted -"))
    },
}
module.exports = {afterController}