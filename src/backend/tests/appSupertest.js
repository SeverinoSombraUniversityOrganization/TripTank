const supertest = require('supertest');
const app = require('../index'); 

module.exports = supertest(app);