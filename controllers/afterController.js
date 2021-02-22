const {appendFile} = require('fs').promises

function formatData(data, id = '') {
    return `${id}: ${Date.now()} : ${JSON.stringify(data)}\n`
}

const afterController = {
    async getCars(_, execResult) {
        await appendFile("./logs/cars.log", `cars was getting successfully, quantity of cars - ${execResult.length} \n`)
    },
    async getUsers(_, execResult) {
        await appendFile("./logs/users.log", `Users was getting successfully, quantity of users ${execResult.length} \n`)
    },
    async setUser(params, execResult) {
        if (execResult) {
            await appendFile("./logs/users.log", formatData(execResult, "User was set"))
        } else {
            await appendFile("./logs/users.log", `ERROR - User - ${JSON.stringify(params)} was not set \n`)
        }

    },
    async setCar(execResult) {
        await appendFile("users.log", formatData(execResult, "Car was set"))
    }
}
module.exports = {afterController}