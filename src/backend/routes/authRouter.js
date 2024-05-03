const { Router } = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = Router();

router.post(`/sign-in`, (req, res) => {
    authController.create(req, res);
});

module.exports = router;
