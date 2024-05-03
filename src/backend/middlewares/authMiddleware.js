const authService = require("../services/authService");
const AuthError = require("../exceptions/authError");

async function authenticationMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    console.log(authHeader)
    if (!authHeader) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const [, token] = authHeader.split(' ');

    try {
        const id = await authService.validateToken(token);
        req.user = { id, token };
    } catch (error) {
        if (error instanceof AuthError) {
            return res.status(401).send();
        }

        return res.status(500).send();
    }

    return next();
}

module.exports = authenticationMiddleware;
