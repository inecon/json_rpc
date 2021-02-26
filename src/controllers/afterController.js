const {appendFile} = require('fs').promises
const CAR_LOG = "./logs/car.log"
const USER_LOG = "./logs/user.log"
function formatData(data, id = '') {
    return `${id}: ${Date.now()} : ${JSON.stringify(data)}\n`
}

const afterController = {
    async getCars(params, execResult, raw) {
        await appendFile(CAR_LOG, `try to get cars, quantity of cars - ${execResult.length} : ${Date.now()}\n`)
    },
    async getCarById(_, execResult) {
        await appendFile(CAR_LOG, `try to get car from DB - ${JSON.stringify(execResult)} \n`)
    },
    async getUsers(_, execResult) {
        await appendFile(USER_LOG, `try to get users, quantity of users ${execResult.length} \n`)
    },
    async getUserById(_, execResult) {
        await appendFile(USER_LOG, `try to get user from DB - ${JSON.stringify(execResult)} \n`)
    },
    async removeUserById(_, execResult) {
        await appendFile(USER_LOG, formatData(execResult, "User deleted -"))
    },
    async setUser(params, execResult) {
        if (execResult) {
            await appendFile(USER_LOG, formatData(execResult, "User was set"))
        } else {
            await appendFile(USER_LOG, `ERROR - User - ${JSON.stringify(params)} was not set \n`)
        }
    },
    async setCar(_, execResult) {
        await appendFile(CAR_LOG, formatData(execResult, "Car was set"))
    },
    async removeCarById(_, execResult) {
        await appendFile(CAR_LOG, formatData(execResult, "TCar deleted -"))
    },
}
module.exports = {afterController}