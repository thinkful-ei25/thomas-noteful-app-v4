'use strict';

const mongoose = require('mongoose');

const { MONGODB_URI } = require('../config');

const Note = require('../models/note');
const Folder = require('../models/folder');
const Tag = require('../models/tag');
const User = require('../models/user');

const { folders, notes, tags, users } = require('../db/data');

console.log(`Connecting to mongodb at ${MONGODB_URI}`);
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useCreateIndex : true })
  .then(() => {
    console.info('Deleting Data...');
    // return Promise.all([
    //   Note.deleteMany(),
    //   Folder.deleteMany(),
    //   Tag.deleteMany(),
    //   User.deleteMany()
    // ]);
    return mongoose.connection.db.dropDatabase();
  })
  .then(() => {
    console.info('Seeding Database...');
    return Promise.all([
      Note.insertMany(notes),
      Folder.insertMany(folders),
      Tag.insertMany(tags),
      User.insertMany(users)
    ]);
  })
  .then(results => {
    // console.log('Inserted', results);
    console.log('Inserted notes seed-data!');
    console.info('Disconnecting...');
    return mongoose.disconnect();
  })
  .catch(err => {
    console.error(err);
    return mongoose.disconnect();
  });
