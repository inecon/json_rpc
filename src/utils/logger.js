const log4js = require('log4js');

log4js.configure({
  appenders: {
    out: { type: 'stdout' },
    app: { type: 'file', filename: './logs/app.log', daysToKeep: 7 },
    http: { type: 'file', filename: './logs/http.log', daysToKeep: 7 },
  },
  categories: {
    http: { appenders: ['http'], level: 'info' },
    app: { appenders: ['app'], level: 'info' },
    default: { appenders: ['out'], level: 'info' },
  },
});

module.exports = log4js;
