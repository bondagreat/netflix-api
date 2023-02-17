const Joi = require('joi');

const validate = require('./validate');

const registerSchema = Joi.object({
  email: Joi.string().email({ tlds: false }).trim().required().messages({
    'string.email': 'must be a valid email',
    'string.empty': 'email is required',
  }),
  phone: Joi.string().trim().required().messages({
    'string.empty': 'phone number is required',
  }),
  password: Joi.string().alphanum().min(6).required().trim().messages({
    'string.empty': 'password is required',
    'string.alphanum': 'password must contain only numbers or alphabets',
    'string.min': 'password must have at least 6 characters',
  }),
  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .trim()
    .messages({
      'any.only': 'password and confirm password did not match',
      'string.empty': 'confirm password is required',
    })
    .strip(),
});

exports.validateRegister = validate(registerSchema);
