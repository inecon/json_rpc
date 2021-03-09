const validations = require('./validations');
const log4js = require('../logger');

const logger = log4js.getLogger();

function validation(data, rules = []) {
  const errors = [];
  rules.forEach(({ name, rules: config }) => {
    const field = data[name];

    config.forEach((validation) => {
      const key = typeof validation === 'string' ? validation : validation.type;

      // TODO убрать это заменить ошибкой
      // const checker = validations[key];
      // if (!checker) {
      //   logger.error(`Rule ${key} wasn't found`);
      //   return;
      // }
      // TODO чекер сделать возвращение результат и параметры и сделать выход при первой ошибки
      const error = checker({
        field,
        name,
        ...(validation.params && { params: validation.params }),
      });
      // eslint-disable-next-line no-unused-expressions
      // TODO мутирование исправить пуш
      error && errors.push(error);
    });
  });
  return errors;
}

module.exports = validation;
