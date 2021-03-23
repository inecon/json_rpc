const validations = require('./validations');
const TYPES = require('./types');

// TODO add describe
test('Should isString', () => {
  expect(validations[TYPES.isString]({ field: 'testString', name: 'testString' })).toBe(null);
});

test('Should error isString', () => {
  expect(validations[TYPES.isString]({ field: 123456, name: 'testString' })).toBe('Field => testString <= must be String');
});

test('Should isNumber', () => {
  expect(validations[TYPES.isNumber]({ field: 123456, name: 'testString' })).toBe(null);
});

test('Should error isNumber', () => {
  expect(validations[TYPES.isNumber]({ field: 'testString', name: 'testString' })).toBe('Field => testString <= must be Number');
});

test('Should isObjectID', () => {
  expect(validations[TYPES.isObjectID]({ field: '6048e4b2756e3a00cdaf3f46', name: 'testString' })).toBe(null);
});

test('Should error isObjectID', () => {
  expect(validations[TYPES.isObjectID]({ field: '6047370890093bb5983200', name: 'testString' })).toBe('Field => testString <= must be ObjectID');
});
