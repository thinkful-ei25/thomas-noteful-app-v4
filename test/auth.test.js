'use strict';

const app = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { JWT_SECRET, TEST_MONGODB_URI } = require('../config');

const expect = chai.expect;

// This let's us make HTTP requests
// in our tests.
// see: https://github.com/chaijs/chai-http
chai.use(chaiHttp);

describe.only('Auth endpoints', function () {
  const _id = '333333333333333333333301';
  const username = 'exampleUser';
  const password = 'examplePass';
  const fullname = 'Example User';

  before(function () {
    return mongoose.connect(TEST_MONGODB_URI)
      .then(() => mongoose.connection.db.dropDatabase());
  });

  beforeEach(function () {
    return User.hashPassword(password).then(digest =>
      User.create({
        _id,
        username,
        password: digest,
        fullname
      })
    );
  });

  afterEach(function () {
    return mongoose.connection.db.dropDatabase();
  });

  after(function () {
    return mongoose.disconnect();
  });

  describe('/api/login', function () {
    it('Should reject requests with no credentials', function () {
      return chai
        .request(app)
        .post('/api/login')
        .send({})
        .then((res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('Bad Request');
        });
    });

    it('Should reject requests with incorrect usernames', function () {
      return chai
        .request(app)
        .post('/api/login')
        .send({ username: 'wrongUsername', password })
        .then((res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('Unauthorized');
        });
    });

    it('Should reject requests with incorrect passwords', function () {
      return chai
        .request(app)
        .post('/api/login')
        .send({ username, password: 'wrongPassword' })
        .then((res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('Unauthorized');
        });
    });

    it('Should return a valid auth token', function () {
      return chai
        .request(app)
        .post('/api/login')
        .send({ username, password })
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.authToken).to.be.a('string');
          const payload = jwt.verify(res.body.authToken, JWT_SECRET);
          expect(payload.user).to.not.have.property('password');
          expect(payload.user.id).to.equal(_id);
          expect(payload.user.username).to.deep.equal(username);  
        });
    });

    it('Should reject requests with empty string username', function () {
      return chai.request(app)
        .post('/api/login')
        .send({ username: '', password })
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('Bad Request');
        });
    });

    it('Should reject requests with empty string password', function () {
      return chai.request(app)
        .post('/api/login')
        .send({ username, password: '' })
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('Bad Request');
        });
    });

  });

  describe('/api/login/refresh', function () {
    it('Should reject requests with no credentials', function () {
      return chai
        .request(app)
        .post('/api/login/refresh')
        .then((res) => {
          expect(res).to.have.status(401);
        });
    });

    it('Should reject requests with an invalid token', function () {
      const token = jwt.sign({ username, password, fullname }, 'Incorrect Secret');
      return chai.request(app)
        .post('/api/login/refresh')
        .set('Authorization', `Bearer ${token}`)
        .then(res => {
          expect(res).to.have.status(401);
        });
    });

    it('Should reject requests with an expired token', function () {
      const token = jwt.sign({ username, password, fullname }, JWT_SECRET, { subject: username, expiresIn: Math.floor(Date.now() / 1000) - 10 });
      return chai.request(app)
        .post('/api/login/refresh')
        .set('Authorization', `Bearer ${token}`)
        .then(res => {
          expect(res).to.have.status(401);
        });
    });

    it('Should return a valid auth token with a newer expiry date', function () {
      const user = { username, fullname };
      const token = jwt.sign({ user }, JWT_SECRET, { subject: username, expiresIn: '1m' });
      const decoded = jwt.decode(token);

      return chai.request(app)
        .post('/api/login/refresh')
        .set('Authorization', `Bearer ${token}`)
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.been.a('object');
          const authToken = res.body.authToken;
          expect(authToken).to.be.a('string');

          const payload = jwt.verify(authToken, JWT_SECRET);
          expect(payload.user).to.deep.equal({ username, fullname });
          expect(payload.exp).to.be.greaterThan(decoded.exp);
        });
    });
  });
});