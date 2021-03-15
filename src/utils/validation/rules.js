const TYPES = require('./types');

const setCarRule = [
  {
    name: 'brand',
    rules: [
      TYPES.isRequired,
      TYPES.isString,
      {
        type: TYPES.minMax,
        params: {
          min: 2,
          max: 10,
        },
      },
    ],
  },
  {
    name: 'model',
    rules: [
      TYPES.isRequired,
      TYPES.isString,
      {
        type: TYPES.minMax,
        params: {
          min: 4,
          max: 15,
        },
      },
    ],
  },
  {
    name: 'color',
    rules: [
      TYPES.isRequired,
      TYPES.isString,
      {
        type: TYPES.minMax,
        params: {
          min: 2,
          max: 25,
        },
      },
    ],
  },
];
const getByIdRule = [
  {
    name: '_id',
    rules: [
      TYPES.isRequired,
      {
        type: TYPES.isObjectID,
      },
    ],
  },
];
const setUserRule = [
  {
    name: 'name',
    rules: [
      TYPES.isRequired,
      TYPES.isString,
      {
        type: TYPES.minMax,
        params: {
          min: 2,
          max: 15,
        },
      },
    ],
  },
  {
    name: 'surname',
    rules: [
      TYPES.isRequired,
      TYPES.isString,
      {
        type: TYPES.minMax,
        params: {
          min: 2,
          max: 25,
        },
      },
    ],
  },
  {
    name: 'password',
    rules: [
      TYPES.isRequired,
      TYPES.isNumber,
      {
        type: TYPES.minMax,
        params: {
          min: 6,
          max: 14,
        },
      },
    ],
  },
  {
    name: 'cars',
    rules: [
      TYPES.isArray,
    ],
  },
];

module.exports = { setCarRule, getByIdRule, setUserRule };
