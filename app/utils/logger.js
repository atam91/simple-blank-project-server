const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const ERROR = 'error';
const WARN = 'warn';
const INFO = 'info';
const VERBOSE = 'verbose';
const DEBUG = 'debug';
const SILLY = 'silly';


const fileLogger = createLogger({
    format: combine(
        timestamp(),
        format.json()
    ),

    transports: [
        new transports.File({
            level: INFO,
            filename: './logs/combined.log',            /// FIXME!!! NOT HERE
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB                     /// TODO test how it works
            maxFiles: 5,                                /// TODO test how it works
        })
    ],
    exitOnError: false
});


const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}] ${message}`;
});

const consoleLogger = createLogger({
    format: combine(
        timestamp(),
        logFormat
    ),

    transports: [
        new transports.Console({
            level: DEBUG,
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
});

const fixEscapeChars = str => str.replace ? str.replace(/\[\d+m|\n$/g, '') : str;


class Logger {
    error (message) {
        this.log(ERROR, message);
    }

    warn (message) {
        this.log(WARN, message);
    }

    info (message) {
        this.log(INFO, message);
    }

    verbose (message) {
        this.log(VERBOSE, message);
    }

    debug (message) {
        this.log(DEBUG, message);
    }

    silly (message) {
        this.log(SILLY, message);
    }

    log (level, message) {
        /// TODO add mute for  (process.env.NODE_ENV === 'test')

        if (message instanceof Error) {
            fileLogger.log({
                level,
                message: message.stack
                    .split('\n')
                    .map(str => str.trim())
                    .join(';; ')
            });
            consoleLogger.log({
                level,
                message: message.stack
            });
        } else {
            fileLogger.log({ level, message: fixEscapeChars(message) });
            consoleLogger.log({ level, message });
        }
    }

    get stream() {
        return {
            write: (message) => {
                this.log(INFO, message);
            }
        };
    }
}


module.exports = new Logger;
