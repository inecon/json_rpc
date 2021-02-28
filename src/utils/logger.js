const log4js = require("log4js");

log4js.configure({
    appenders: {
        out: { type: 'stdout' },
        app: { type: 'file', filename: './logs/app.log' },
        car: { type: 'file', filename: './logs/car.log' },
        user: { type: 'file', filename: './logs/user.log' },
    },
    categories: {
        default: { appenders: [ 'out', 'app' ], level: 'error' },
        car: { appenders: [ 'out', 'car' ], level: 'debug' },
        user: { appenders: [ 'out', 'user' ], level: 'debug' },
    }
});

module.exports = log4js