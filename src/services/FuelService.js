const BaseEntityService = require('./BaseEntityService');

class FuelService extends BaseEntityService {
    constructor() {
        super('fuel'); 
    }
}

module.exports = new FuelService();