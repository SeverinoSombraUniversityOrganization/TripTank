const BaseCrudRouter = require('./baseCrudRouter');
const fuelController = require('../controllers/fuelController');

class FuelRouter extends BaseCrudRouter {
}

module.exports = new FuelRouter(fuelController).getRouter();