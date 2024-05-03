const BaseCrudRepository = require('./baseCrudRepository');
const UserModel = require('../models/userModel');

class UserRepository extends BaseCrudRepository {      
    async getByNameAndPassword(name, password) {
        try {
            const user = await this.model.findOne({ name, password });
            return user;
        } catch (error) {
            console.error("Error fetching user by name and password:", error);
            throw error;
        }
    }
}

module.exports = new UserRepository(UserModel);