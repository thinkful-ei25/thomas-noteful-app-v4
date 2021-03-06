'use strict';

const express = require('express');
const User = require('../models/user');
const router = express.Router();

/* ========== POST (/api/users) USER ENDPOINT ========== */
router.post('/', (req, res, next) => {
  let { fullname, username, password } = req.body;
  fullname = fullname.trim();

  const requiredFields = ['username', 'password'];
  const missingField = requiredFields.find(field => !(field in req.body));
  // username and password fields required - check for missing fields and throw error
  if (missingField) {
    const err = new Error(`Missing '${missingField}' in request body`);
    err.status = 422;
    err.reason = 'ValidationError';
    err.location = `${missingField}`;
    return next(err);
  }

  // if (missingField) {
  //   return res.status(422).json({
  //     code: 422,
  //     reason: 'ValidationError',
  //     message: 'Missing field',
  //     location: missingField
  //   });
  // }

  // fields are type string check
  const stringFields = ['username', 'password', 'fullname'];
  const nonStringField = stringFields.find(field => field in req.body && typeof req.body[field] !== 'string');

  if (nonStringField) {
    const err = new Error('Incorrect field type: expected string');
    err.status = 422;
    err.reason = 'ValidationError';
    err.location = `${nonStringField}`;
    return next(err);
  }

  // if (nonStringField) {
  //   return res.status(422).json({
  //     code: 422,
  //     reason: 'ValidationError',
  //     message: 'Incorrect field type: expected string',
  //     location: nonStringField
  //   });
  // }

  // the username and password should not have leading or trailing whitespace. 
  // and the endpoint should not automatically trim the values.
  const explicityTrimmedFields = ['username', 'password'];
  const nonTrimmedField = explicityTrimmedFields.find(
    field => req.body[field].trim() !== req.body[field]
  );

  if (nonTrimmedField) {
    const err = new Error('Cannot start or end with whitespace');
    err.status = 422;
    err.reason = 'ValidationError';
    err.location = `${nonTrimmedField}`;
    return next(err);
  }

  // the username is a minimum of 1 character
  // the password is a minimum of 8 and a max of 72 characters
  const sizedFields = {
    username: {
      min: 1
    }
  };
  const sizedFields1 = {
    password: {
      min: 8,
      max: 72
    }
  };
  const tooSmallField = Object.keys(sizedFields).find(
    field => 
      'min' in sizedFields[field] &&
            req.body[field].trim().length < sizedFields[field].min
  );

  if (tooSmallField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: `Username must be at least ${sizedFields[tooSmallField].min} characters long`,
      location: tooSmallField
    });
  }

  const tooSmallField1 = Object.keys(sizedFields1).find(
    field => 
      'min' in sizedFields1[field] &&
            req.body[field].trim().length < sizedFields1[field].min
  );
  const tooLargeField1 = Object.keys(sizedFields1).find(
    field =>
      'max' in sizedFields1[field] &&
            req.body[field].trim().length > sizedFields1[field].max
  );

  if (tooSmallField1 || tooLargeField1) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: tooSmallField1
        ? `Password must be at least ${sizedFields1[tooSmallField1]
          .min} characters long`
        : `Password must be at most ${sizedFields1[tooLargeField1]
          .max} characters long`,
      location: tooSmallField1 || tooLargeField1
    });
  }

  // *QUESTION - syntax to write the if block in this format? with the || operators.
  // if (tooSmallField || tooLargeField) {
  //   const err = new Error(`${tooSmallField}`
  //     ? `Must be at least ${sizedFields[tooSmallField]
  //       .min} characters long`
  //     : `Must be at most ${sizedFields[tooLargeField]
  //       .max} characters long`);
  //   err.status = 422;
  //   err.location = `${tooSmallField}` || `${tooLargeField}`;
  //   err.reason = 'ValidationError';
  //   return next(err);
  // }


  return User.hashPassword(password)
    .then(digest => {
      const newUser = {
        username,
        password: digest,
        fullname
      };
      return User.create(newUser);
    })
    .then(result => {
      res.location(`/api/users/${result.id}`)
        .status(201)
        .json(result);
    })
    .catch(err => {
      if (err.code === 11000) {
        err = new Error('The username already exists');
        err.status = 400;
        err.reason = 'ValidationError';
        err.location = 'username';
      }
      next(err);
    });
});

module.exports = router;