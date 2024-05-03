const mongoose = require('../services/databaseService'); 

describe('MongoDB Connection Test', () => {

  it('successfully connects to MongoDB', async () => {
    const connectionState = mongoose.connection.readyState;
    expect([1, 2]).toContain(connectionState);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

});
