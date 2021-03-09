require('dotenv').config();
const app = require('express')();
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jsonRouter = require('express-json-rpc-router');
const log4js = require('./src/utils/logger');
const controller = require('./src/controllers/controller');
const beforeController = require('./src/controllers/beforeController');
const afterController = require('./src/controllers/afterController');

const logger = log4js.getLogger();
app.use(helmet());
app.use(bodyParser.json());
app.use(jsonRouter({
  methods: controller,
  beforeMethods: beforeController,
  afterMethods: afterController,
  onError(e) {
    logger.error('Something went wrong - error occurred!', e.toString());
  },
}));
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
