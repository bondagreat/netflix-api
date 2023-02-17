const { validateRegister } = require('../validators/auth-validators')
const bcrypt = require('bcryptjs')

const { User } = require('../models')
const createError = require('../utils/create-error')

exports.register = async (req, res, next) => {
  try {
    const value = validateRegister(req.body)

    const user = await User.findOne({ where: { email: value.email }})
    if (user) {
      createError('email is already in use', 400)
    }

    value.password = await bcrypt.hash(value.password, 12)
    await User.create(value)

    res.status(201).json({ message: 'register success' })
  } catch (err) {
    next(err)
  }
}