const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cars: [{
    car: {
      type: Schema.Types.ObjectId,
      ref: 'Car',
    },
  }],
});

module.exports = model('User', userSchema);
