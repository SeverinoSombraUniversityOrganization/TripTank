const express = require('express');

class BaseCrudRouter {
    constructor(controllerObject) {
        if (!controllerObject) {
            throw new Error('The controllerObject parameter is required to create the BaseCrudRouter.');
        }

        this.controller = controllerObject;
        this.router = express.Router();
        this.setupRoutes();
    }
    setupRoutes() {
        this.router.get(`/list`, (req, res) => {
            this.controller.getList(req, res);
        });
    
        this.router.get(`/:id`, (req, res) => {
            this.controller.getById(req, res);
        });
    
        this.router.post(`/create`, (req, res) => {
            this.controller.create(req, res);
        });
    
        this.router.put(`/update/:id`, (req, res) => {
            this.controller.update(req, res);
        });
    
        this.router.delete(`/delete/:id`, (req, res) => {
            this.controller.delete(req, res);
        });
    }    

    getRouter() {
        return this.router;
    }
}

module.exports = BaseCrudRouter;
