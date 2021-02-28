const log4js = require("log4js");

log4js.configure({
    appenders: {
        out: {type: 'stdout'},
        app: {type: 'file', filename: './logs/app.log', daysToKeep: 7},
        car: {type: 'file', filename: './logs/car.log', daysToKeep: 7},
        user: {type: 'file', filename: './logs/user.log', daysToKeep: 7},
    },
    categories: {
        default: {appenders: ['out', 'app'], level: 'debug'},
        car: {appenders: ['out', 'car'], level: 'debug'},
        user: {appenders: ['out', 'user'], level: 'debug'},
    }
});

module.exports = log4js