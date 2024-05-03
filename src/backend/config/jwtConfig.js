const env = process.env;

module.exports = {
    auth: {
        secret: env.AUTH_SECRET || 'secret',
        expiresIn: env.AUTH_EXPIRES_IN || '7d',
    }
};