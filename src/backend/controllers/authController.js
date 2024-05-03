const authService = require('../services/authService');
const AuthError = require('../exceptions/authError');

class AuthController {
    async create(req, res) {
        const { username, password } = req.body;
        try {
            const { user, token } = await authService.signIn(username, password);
            return res.status(200).json({ user, token });
        } catch (error) {
            console.log(error)
            if (error instanceof AuthError) {
                return res.status(401).send();
            }
            return res.status(500).json({ error });
        }
    }
}

module.exports = new AuthController();
