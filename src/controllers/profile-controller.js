const fs = require('fs');
const { Profile } = require('../models');
const cloudianry = require('../utils/cloudinary');
const createError = require('../utils/create-error');
const { validatePin } = require('../validators/auth-validators');

exports.getProfile = async (req, res, next) => {
  try {
    const { id } = req.params;

    const profile = await Profile.findOne({
      where: { userId: req.user.id, id: id },
    });

    res.status(200).json({ profile });
  } catch (err) {
    next(err);
  }
};

exports.addProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findAll({ where: { userId: req.user.id } });

    if (profile.length < 4) {
      const input = req.body;
      const photo = await cloudianry.upload(req.file?.path);
      input.profileImg = photo;
      input.userId = req.user.id;

      await Profile.create(input);
      fs.unlinkSync(req.file.path);
    } else {
      createError('profile limit is 4', 401);
    }

    res.status(201).json({ message: 'create profile success' });
  } catch (err) {
    next(err);
  }
};

exports.editProfile = async (req, res, next) => {
  try {
    const input = req.body;
    if (req.file) {
      const profile = await Profile.findOne({ where: { id: req.body.id } });
      const profileImg = profile.profileImg;
      const profilePublicId = profileImg
        ? cloudianry.getPublicId(profileImg)
        : null;
      const photo = await cloudianry.upload(req.file.path, profilePublicId);
      input.profileImg = photo;
    }

    await Profile.update(input, { where: { id: input.id } });
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }

    res.status(200).json({ message: 'profile edit success' });
  } catch (err) {
    next(err);
  }
};

exports.deleteProfile = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Profile.destroy({ where: { id: id } });

    res.status(204).json();
  } catch (err) {
    next(err);
  }
};

exports.editPin = async (req, res, next) => {
  try {
    const value = validatePin(req.body);

    const { pin } = await Profile.findOne({ where: { id: value.id } });
    if (!pin) {
      await Profile.update({ pin: value.pin }, { where: { id: value.id } });
    }
    if (value.oldPin === pin) {
      await Profile.update({ pin: value.pin }, { where: { id: value.id } });
    } else {
      createError('old pin or new pin is incorrect', 401);
    }

    res.status(200).json({ message: 'create pin success' });
  } catch (err) {
    next(err);
  }
};

exports.deletePin = async (req, res, next) => {
  try {
    const value = req.body;

    if (!value.pin) {
      await Profile.update({ pin: value.pin }, { where: { id: value.id } });
    } else {
      createError('delete pin failed', 401);
    }

    res.status(200).json({ message: 'delete pin success' });
  } catch (err) {
    next(err);
  }
};
