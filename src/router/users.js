const { Router } = require('express');
const { User } = require('../models');
const mapperToResponse = require('../utils/mapper');
const { validation, rules } = require('../utils/validation');
const { isError } = require('../utils/helpers');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const users = await User.find().populate('car');
    res.send(mapperToResponse({
      data: users,
      error: !users.length,
      message: users.length ? '' : 'Users not found at DB',
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
    const user = await User.findById(req.params._id).populate('car');
    if (!user) { res.status(404); }
    res.send(mapperToResponse({
      data: user,
      error: !user,
      message: user ? '' : 'User not found at DB',
    }));
  } catch (e) {
    res.send(mapperToResponse({
      error: true,
      message: e.toString(),
    }));
  }
});
router.get('/cars/:_id', async (req, res) => {
  try {
    const error = validation(req.params, rules.getByIdRule);
    isError(error, res);
    const user = await User.find({ cars: { $elemMatch: { _id: `${req.params._id}` } } });
    if (!user.length) { res.status(404); }
    res.send(mapperToResponse({
      data: user,
      error: !user.length,
      message: user.length ? '' : 'Users not found at DB',
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
    const error = validation({ ...req.body }, rules.setUserRule);
    isError(error, res);
    const user = new User({ ...req.body });
    const result = await user.save();
    res.send(mapperToResponse({
      data: result,
      error: !result,
      message: result ? '' : 'User not saved to DB',
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
    const deletedUser = await User.findByIdAndDelete(req.params._id);
    res.send(mapperToResponse({
      data: deletedUser,
      error: !deletedUser,
      message: deletedUser ? '' : 'User not found at DB',
    }));
  } catch (e) {
    res.send(mapperToResponse({
      error: true,
      message: e.toString(),
    }));
  }
});

module.exports = router;
