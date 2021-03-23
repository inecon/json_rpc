require('dotenv').config();
const app = require('express')();
const helmet = require('helmet');
const compression = require('compression');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const log4js = require('log4js');
const { carsRouter, usersRouter } = require('./src/router');
const logger = require('./src/utils/logger').getLogger();
const httpLogger = require('./src/utils/logger').getLogger('http');
const appLogger = require('./src/utils/logger').getLogger('app');

app.use(log4js.connectLogger(httpLogger, {
  level: 'info',
  format: (req, res, format) => format(`:remote-addr :method :url :status :res[content-length] :referrer :user-agent :response-timems ${JSON.stringify(req.body)}`),
}));

app.use(helmet());
app.use(compression());
app.use(bodyParser.json());

app.use('/cars', carsRouter);
app.use('/users', usersRouter);

const PORT = process.env.PORT || 3000;
let server;
async function start() {
  try {
    const url = process.env.MONGODB_URI;
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    server = app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  } catch (e) {
    appLogger.error(e);
  }
}

start();

process.on('SIGTERM', () => {
  appLogger.info('SIGTERM signal received.');
  appLogger.info('Closing http server.');
  server.close(() => {
    appLogger.info('Http server closed.');
    // boolean means [force], see in mongoose doc
    mongoose.connection.close(false, () => {
      appLogger.info('MongoDb connection closed.');
      process.exit(0);
    });
  });
});
