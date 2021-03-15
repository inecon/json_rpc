const validations = require('./validations');
const rule = require('./rules');

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
      // if field is array - check objects in array
      if (checker.name === 'isArray') {
        if (field.length != null) {
          field.some((carId) => {
            error = validation(carId, rule.getByIdRule);
            return error == null ? null : error;
          });
        }
      } else {
        error = checker({
          field,
          name,
          ...(validationType.params && { params: validationType.params }),
        });
      }
      return error == null ? null : error;
    });
    return error == null ? null : error;
  });
  return error;
}

module.exports = validation;
