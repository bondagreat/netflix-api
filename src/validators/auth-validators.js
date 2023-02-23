const Joi = require('joi');

const validate = require('./validate');

const registerSchema = Joi.object({
  email: Joi.string().email({ tlds: false }).trim().required().messages({
    'string.email': 'must be a valid email',
    'string.empty': 'email is required',
  }),
  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .trim()
    .required()
    .messages({
      'string.empty': 'phone number is required',
      'string.match': 'must be a valid phone number',
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

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

exports.validateLogin = validate(loginSchema);

const pinSchema = Joi.object({
  // id: Joi.number().integer().required().messages({
  //   'number.empty': 'id is required',
  // }),
  // oldPin: Joi.string(),
  pin: Joi.string()
    .pattern(/^[0-9]{4}$/)
    .messages({
      'string.empty': 'pin is required',
      'string.match': 'pin must be a number',
    }),
  confirmPin: Joi.string()
    .valid(Joi.ref('pin'))
    .messages({
      'any.only': 'pin and confirm pin did not match',
      'string.empty': 'confirm pin is required',
    })
    .strip(),
});

exports.validatePin = validate(pinSchema, { allowUnknown: true });
