const { Router } = require('express');
const { Car, User } = require('../models');
const mapperToResponse = require('../utils/mapper');

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
router.get('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
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
router.get('/users/:id', async (req, res) => {
  try {
    const carsIds = (await User.findById(req.params.id)).cars;
    const cars = [];
    if (carsIds) {
      for (const car of carsIds) {
        cars.push(await Car.findById(car._id));
      }
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
    console.log(req.body);
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
router.delete('/:id', async (req, res) => {
  try {
    const deletedCar = await Car.findByIdAndDelete(req.params.id);
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
