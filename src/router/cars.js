const { Router } = require('express');
const { forEach } = require('p-iteration');
const { Car, User } = require('../models');
const mapperToResponse = require('../utils/mapper');
const { validation, rules } = require('../utils/validation');
const { isError } = require('../utils/helpers');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const cars = await Car.find();
    res.send(mapperToResponse({
      data: cars,
      error: !cars.length,
      message: cars.length ? '' : 'Cars not found at DB',
    }));
  } catch (e) {
    res.send(mapperToResponse({
      error: true,
      message: e.toString(),
    }));
  }
});
router.get('/:_id', async (req, res) => {
  try {
    const error = validation(req.params, rules.getByIdRule);
    isError(error, res);
    const car = await Car.findById(req.params._id);
    res.send(mapperToResponse({
      data: car,
      error: !car,
      message: car ? '' : 'Car not found at DB',
    }));
  } catch (e) {
    res.send(mapperToResponse({
      error: true,
      message: e.toString(),
    }));
  }
});
router.get('/users/:_id', async (req, res) => {
  try {
    const error = validation(req.params, rules.getByIdRule);
    isError(error, res);
    const carsIds = (await User.findById(req.params._id)).cars;
    const cars = [];
    if (carsIds) {
      await forEach(carsIds, async (car) => {
        const foundedCar = await Car.findById(car._id);
        if (foundedCar != null) { cars.push(foundedCar); }
      });
    }
    res.send(mapperToResponse({
      data: cars,
      error: !cars.length,
      message: cars.length ? '' : 'Cars not found at DB',
    }));
  } catch (e) {
    res.send(mapperToResponse({
      error: true,
      message: e.toString(),
    }));
  }
});
router.post('/', async (req, res) => {
  try {
    const error = validation({ ...req.body }, rules.setCarRule);
    isError(error, res);
    const car = new Car({ ...req.body });
    const result = await car.save();
    res.send(mapperToResponse({
      data: result,
      error: !result,
      message: result ? '' : 'Car not saved to DB',
    }));
  } catch (e) {
    res.send(mapperToResponse({
      error: true,
      message: e.toString(),
    }));
  }
});
router.delete('/:_id', async (req, res) => {
  try {
    const error = validation(req.params, rules.getByIdRule);
    isError(error, res);
    const deletedCar = await Car.findByIdAndDelete(req.params._id);
    res.send(mapperToResponse({
      data: deletedCar,
      error: !deletedCar,
      message: deletedCar ? '' : 'Car not found at DB',
    }));
  } catch (e) {
    res.send(mapperToResponse({
      error: true,
      message: e.toString(),
    }));
  }
});

module.exports = router;
