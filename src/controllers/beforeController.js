const User = require('../models/user');
const Car = require('../models/car');
const validation = require('../utils/validation/validation');
const { setCarRule, getByIdRule, setUserRule } = require('../utils/validation/rules');

const beforeController = {
  async setCar(params) {
    const errors = validation(params, setCarRule);
    // TODO вынести в хелпер метод
    if (errors.length) {
      throw new Error(errors.toString());
    }
  },
  async getCarById(params) {
    const errors = validation(params, getByIdRule);
    if (errors.length) {
      throw new Error(errors.toString());
    }
  },
  async getCarsByUserId(params) {
    const errors = validation(params, getByIdRule);
    if (errors.length) {
      throw new Error(errors.toString());
    }
    const user = await User.findById(params._id);
    if (!user) {
      const error = new Error(`User with ID = ${params._id} not found`);
      error.data = { params };
      throw error;
    }
  },
  async removeCarById(params) {
    const errors = validation(params, getByIdRule);
    if (errors.length) {
      throw new Error(errors.toString());
    }
  },
  async setUser(params, _, raw) {
    const errors = validation(params, setUserRule);
    if (errors.length) {
      throw new Error(errors.toString());
    }
    if (params.cars) {
      const savedCars = [];
      for (const car of params.cars) {
        const errors = validation(car, getByIdRule);
        if (errors.length) {
          throw new Error(errors.toString());
        }
        const findedCar = await Car.findById(car._id);
        if (findedCar) {
          savedCars.push(findedCar);
        } else {
          const error = new Error(`Car with ID = ${car._id} not found`);
          error.data = { params };
          throw error;
        }
      }
      raw.ids = savedCars.map(({ _id }) => ({ _id }));
    }
  },
  async getUsersByCarId(params) {
    const errors = validation(params, getByIdRule);
    if (errors.length) {
      throw new Error(errors.toString());
    }
    const car = await Car.findById(params._id);
    if (!car) {
      const error = new Error(`Car with ID = ${params._id} not found`);
      error.data = { params };
      throw error;
    }
  },
  async getUserById(params) {
    const errors = validation(params, getByIdRule);
    if (errors.length) {
      throw new Error(errors.toString());
    }
  },
  async removeUserById(params) {
    const errors = validation(params, getByIdRule);
    if (errors.length) {
      throw new Error(errors.toString());
    }
  },
};

module.exports = beforeController;
