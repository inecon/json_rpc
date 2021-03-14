require('dotenv').config();
const app = require('express')();
const helmet = require('helmet');
const compression = require('compression');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const rfs = require('rotating-file-stream');
const path = require('path');
const { carsRouter, usersRouter } = require('./src/router');
const logger = require('./src/utils/logger').getLogger();

const accessLogStream = rfs.createStream('reqRes.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'logs'),
});

// log all requests to working.log
app.use(morgan(':date[web] :method :url :status :res[header] :res[content-length] - :response-time ms', {
  stream: accessLogStream,
}));
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
