
const HTTP_MESSAGES = {
    200: 'OK',
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found ',
    500: 'Internal Server Error',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    504: 'Gateway Timeout'
};
const UNEXPECTED_MESSAGE = 'Unexpected error';


class HttpStatusError extends Error {
    constructor(statusCode, message) {
        super(message || HTTP_MESSAGES[statusCode] || UNEXPECTED_MESSAGE);

        this.name = 'HttpStatusError';
        this.status = statusCode || 500;
    }

    static create(...args) { return new this(...args) }
}


class HumanizedError extends HttpStatusError {
    constructor(statusCode, message, humanMessage) {
        super(statusCode, message);

        this.name = 'HumanizedError';
        this.humanMessage = humanMessage;
    }
}

const badRequestError = (...args) => HumanizedError.create(400, ...args);
const forbiddenError = (...args) => HumanizedError.create(403, ...args);
const notFoundError = (...args) => HumanizedError.create(404, ...args);


module.exports = {
    HttpStatusError,
    HumanizedError,
    badRequestError,
    forbiddenError,
    notFoundError
};