const BaseCrudRepository = require('./baseCrudRepository');
const UserModel = require('../models/userModel');

class UserRepository extends BaseCrudRepository {      
    async getByUsernameAndPassword(username, password) {
        try {
            const user = await this.model.findOne({ username, password });
            return user;
        } catch (error) {
            console.error("Error fetching user by username and password:", error);
            throw error;
        }
    }
}

module.exports = new UserRepository(UserModel);