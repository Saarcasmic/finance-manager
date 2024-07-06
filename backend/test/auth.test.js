const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const User = require('../models/User');

const should = chai.should();
chai.use(chaiHttp);

describe('Auth Routes', () => {
  before(async () => {
    await User.deleteMany({});
  });

  it('should register a user', (done) => {
    chai.request(server)
      .post('/api/auth/register')
      .send({ username: 'testuser', email: 'test@example.com', password: 'password' })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('User registered successfully');
        done();
      });
  });

  it('should login a user', (done) => {
    chai.request(server)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'password' })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('token');
        done();
      });
  });
});
