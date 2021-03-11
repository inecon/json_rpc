const validations = require('./validations');

function validation(data, rules = []) {
  let error = '';
  rules.some(({ name, rules: config }) => {
    const field = data[name];
    config.some((validationType) => {
      const key = typeof validationType === 'string' ? validationType : validationType.type;
      const checker = validations[key];
      if (!checker) {
        throw new Error(`Rule ${key} wasn't found`);
      }
      error = checker({
        field,
        name,
        ...(validationType.params && { params: validationType.params }),
      });
      return error == null ? null : error;
    });
    return error == null ? null : error;
  });
  return error;
}

module.exports = validation;
