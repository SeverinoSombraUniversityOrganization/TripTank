const userRepository = require('../repositories/userRepository')
const jwt = require('jsonwebtoken');
const AuthError = require('../exceptions/authError');
const jwtConfig = require('../config/jwtConfig');

class AuthService {

    async signIn(username, password) {
        try {
            const user = await userRepository.getByUsernameAndPassword(
                username,
                password,
            );            
            if (!user) {
                throw new AuthError('Invalid credentials');
            }

            const { id, name } = user;

            const token = jwt.sign({ id, name, username }, jwtConfig.auth.secret, {
                expiresIn: jwtConfig.auth.expiresIn,
            });

            jwt.verify(token, jwtConfig.auth.secret);
            return {
                user: {
                    id,
                    name,
                    username,
                },
                token,
            };
        } catch (error) {
            throw new AuthError('Authentication failed');
        }
    }

    async validateToken(token) {
        try {
            const decoded = jwt.verify(token, config.auth.secret);
            return decoded.id;
        } catch (error) {
            throw new AuthError('Invalid token');
        }
    }
    
}

module.exports = new AuthService();