const BaseCrudRouter = require('./baseCrudRouter');
const userController = require('../controllers/userController');

class UserRouter extends BaseCrudRouter {

    setupRoutes() {
        this.router.post(`/create`, (req, res) => {
            this.controller.create(req, res);
        });
    }

}

module.exports = new UserRouter(userController).getRouter();