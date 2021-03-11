require('dotenv').config();
const app = require('express')();
const helmet = require('helmet');
const compression = require('compression');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { carsRouter, usersRouter } = require('./src/router');

const log4js = require('./src/utils/logger');

const logger = log4js.getLogger();

app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use('/cars', carsRouter);
app.use('/users', usersRouter);

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    const url = process.env.MONGODB_URI;
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  } catch (e) {
    logger.error(e);
  }
}

start();
