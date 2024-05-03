const BaseCrudRepository = require('./baseCrudRepository');
const FuelModel = require('../models/fuelModel');

class FuelRepository extends BaseCrudRepository {      
}

module.exports = new FuelRepository(FuelModel);