const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateLoginInput(data) {
  let errors = {};
  data.username = !isEmpty(data.username) ? data.username : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if(!Validator.isEmail(data.username)) {
    errors.email = 'Email is invalid';
  }

  if(Validator.isEmpty(data.username)) {
    errors.email = 'Email is required';
  }

  if(!Validator.isLength(data.password, {min: 6, max: 30})) {
    errors.password = 'Password must have 6 chars';
  }

  if(Validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}