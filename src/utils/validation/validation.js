const validations = require('./validations');
const log4js = require('../logger');

const logger = log4js.getLogger();

function validation(data, rules = []) {
  const errors = [];
  rules.forEach(({ name, rules: config }) => {
    const field = data[name];

    config.forEach((validation) => {
      const key = typeof validation === 'string' ? validation : validation.type;

      const checker = validations[key];
      if (!checker) {
        logger.error(`Rule ${key} wasn't found`);
        return;
      }
      const error = checker({
        field,
        name,
        ...(validation.params && { params: validation.params }),
      });
      // eslint-disable-next-line no-unused-expressions
      error && errors.push(error);
    });
  });
  return errors;
}

module.exports = validation;
