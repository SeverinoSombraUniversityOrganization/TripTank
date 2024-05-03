const BaseCrudController = require('./baseCrudController');
const userRepository = require('../repositories/userRepository')

class UserController extends BaseCrudController {    
}

module.exports = new UserController(userRepository);