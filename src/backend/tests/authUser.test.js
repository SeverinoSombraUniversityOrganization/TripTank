const app = require('./appSupertest');

describe('Authentication Test', () => {
  it('should authenticate a newly created user', async () => {
    
    const randomUserData = {
      username: `user_${Math.random().toString(36).substring(7)}`,
      name: `name_${Math.random().toString(36).substring(7)}`,
      password: Math.random().toString(36).substring(7)
    };
  
    const createUserResponse = await app.post('/api/user/create').send(randomUserData);
    const createdUser = createUserResponse.text;
  
    //Bug, não é enviado ao controlador o corpo da requisição, isso só acontece durante o test, o postman funciona.
    const authUserResponse = await app.post('/api/auth/sign-in').send({
      username: createdUser.username,
      password: createdUser.password
    });

    expect(authUserResponse.statusCode).toBe(200); 
  });
});
