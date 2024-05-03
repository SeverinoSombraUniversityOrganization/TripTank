const BaseEntityService = require('./BaseEntityService');

class UserService extends BaseEntityService {
    constructor() {
        super('user'); 
    }

    async getList() {
    }

    async getById(id) {
    }

    async update(id, data) {
    }

    async delete(id) {
    }
}

module.exports = new UserService();