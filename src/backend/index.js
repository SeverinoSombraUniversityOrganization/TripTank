const express = require('express');
const { createMainRouter } = require('./routes/mainRouter');
const cors = require('cors');
const app = express();

app.use(express.json()); 
app.use(cors({
  origin: '*'
}));

const port = process.env.BACKEND_PORT || 3001;
const host = process.env.BACKEND_HOST || '0.0.0.0';

const mainRouter = createMainRouter(app);
app.use('/api', mainRouter);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, host, (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server is now listening on http://${host}:${port}`);
  });
}

module.exports = app;