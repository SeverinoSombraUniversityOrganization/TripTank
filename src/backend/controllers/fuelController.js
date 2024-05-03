const BaseCrudController = require('./baseCrudController');
const fuelRepository = require('../repositories/fuelRepository')

class FuelController extends BaseCrudController {      
}

module.exports = new FuelController(fuelRepository);