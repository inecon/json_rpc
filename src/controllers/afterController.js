const log4js = require('../utils/logger');

const carLogger = log4js.getLogger('car');
const userLogger = log4js.getLogger('user');

const afterController = {
  async setCar(params, execResult) {
    await carLogger.debug(`try to set car - ${execResult.error ? JSON.stringify(execResult.message) : (`SUCCESS - ${JSON.stringify(execResult.data)}`)}`);
  },
  async getCars(params, execResult) {
    await carLogger.debug(`try to get cars, quantity of cars - ${execResult.error ? JSON.stringify(execResult) : execResult.data.length}`);
  },
  async getCarById(params, execResult) {
    await carLogger.debug(`try to get car from DB by ID - "${params._id}" - ${JSON.stringify(execResult)}`);
  },
  async getCarsByUserId(params, execResult) {
    await carLogger.debug(`try to get cars from DB by UserID - "${params._id}" - ${JSON.stringify(execResult)}`);
  },
  async removeCarById(params, execResult) {
    await carLogger.debug(`try to delete car from DB by ID - "${params._id}" -  ${JSON.stringify(execResult)}`);
  },
  async setUser(params, execResult) {
    await userLogger.debug(`try to set user - ${execResult.error ? JSON.stringify(execResult.message) : (`SUCCESS - ${JSON.stringify(execResult.data)}`)}`);
  },
  async getUsers(_, execResult) {
    await userLogger.debug(`try to get users, quantity of users - ${execResult.error ? JSON.stringify(execResult) : execResult.data.length}`);
  },
  async getUserById(params, execResult) {
    await userLogger.debug(`try to get user from DB by ID - "${params._id}" - ${JSON.stringify(execResult)}`);
  },
  async getUsersByCarId(params, execResult) {
    await userLogger.debug(`try to get users from DB by CarID - "${params._id}" - ${JSON.stringify(execResult)}`);
  },
  async removeUserById(params, execResult) {
    await userLogger.debug(`try to delete user from DB by ID - "${params._id}" -  ${JSON.stringify(execResult)}`);
  },
};

module.exports = afterController;
