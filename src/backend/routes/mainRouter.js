const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const userRouter = require('./userRouter');
const authRouter = require('./authRouter');
const fuelRouter = require('./fuelRouter');

function createMainRouter() {
    const mainRouter = express.Router();

    mainRouter.use(`/auth`, authRouter);
    mainRouter.use(`/user`, userRouter);
    mainRouter.use('/fuel', fuelRouter);

    return mainRouter;
}

module.exports = { createMainRouter };
