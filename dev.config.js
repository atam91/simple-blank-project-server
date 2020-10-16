const SERVER_NAME = 'simple-blank-project-server';

const ENVIRONMENT = {
    TZ: 'Europe/Moscow',
    ///DEBUG: 'knex:query knex:bindings',
};

const logPath = filename => `logs/${filename}.log`;
const LOG_DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss.SSS Z';


module.exports = {
    apps: [
        {
            watch: [ 'app' ],
            name: SERVER_NAME,
            script: 'bin/www',
            log_file: logPath(SERVER_NAME),
            out_file: logPath(`${SERVER_NAME}-out`),
            error_file: logPath(`${SERVER_NAME}-error`),
            ///log_date_format: LOG_DATE_FORMAT,
            env: ENVIRONMENT
        }
    ]
};
