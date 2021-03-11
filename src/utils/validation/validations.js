const TYPES = require('./types');
const validation = require('./validation');

const reqExp = {
  onlyNumber: /^\d+$/,
  objectID: /^[0-9a-fA-F]{24}$/,
};

const generateErrorMessage = (name, description) => `Field => ${name} <= ${description}`;

function isRequired({ field = '', name }) {
  if (field == null || field === '') {
    return generateErrorMessage(name, 'is required');
  }
  return null;
}

function maxLength({ field = '', name, params: { maxLimit } }) {
  if (field.length > maxLimit) {
    return generateErrorMessage(name, `must be short short then ${maxLimit}`);
  }
  return null;
}

function minMax({ field, name, params: { min = 1, max = 100 } }) {
  const testField = field == null ? field : String(field);
  if (testField.length < min || testField.length > max || testField == null) {
    return generateErrorMessage(name, `must be between ${min} and ${max}`);
  }
  return null;
}

function isArray({ field = [], name }) {
  if (!Array.isArray(field)) {
    return generateErrorMessage(name, 'must be Array');
  }
  return null;
}

function isString({ field = '', name }) {
  if (!(typeof field === 'string')) {
    return generateErrorMessage(name, 'must be String');
  }
  return null;
}

function isNumber({ field = '', name }) {
  if (!(typeof field === 'number')) {
    return generateErrorMessage(name, 'must be Number`');
  }
  return null;
}

function isObjectID({ field = '', name }) {
  if (!new RegExp(reqExp.objectID).test(field)) {
    return generateErrorMessage(name, 'must be ObjectID`');
  }
  return null;
}

function isValidObjectID({ field, name, params: { nam = '', rules = [] } }) {
  console.log(field);
  console.log(name);
  field.some((item) => {
    console.log(validation);
    const error = validation(item, rules);
    console.log(error);
    return null;
  });
  // const testField = field == null ? field : String(field);
  // if (testField.length < min || testField.length > max || testField == null) {
  //   return generateErrorMessage(name, `must be between ${min} and ${max}`);
  // }
  // return null;
}

module.exports = {
  [TYPES.isRequired]: isRequired,
  [TYPES.maxLength]: maxLength,
  [TYPES.minMax]: minMax,
  [TYPES.isArray]: isArray,
  [TYPES.isNumber]: isNumber,
  [TYPES.isString]: isString,
  [TYPES.isObjectID]: isObjectID,
  [TYPES.isValidObjectID]: isValidObjectID,
};
