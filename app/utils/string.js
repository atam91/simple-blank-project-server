const fromUpperCase = function (value, strict) {
    return value.substr(0, 1).toUpperCase() + (strict ? value.substr(1).toLowerCase() : value.substr(1));
};

const SNAKE_DELIMITER = '_';
const snakeToCamel = function (line) {
    return line.split(SNAKE_DELIMITER)
        .map((val, index) => (index > 0) ? fromUpperCase(val, true) : val.toLowerCase())
        .join('');
};
exports.snakeToCamel = snakeToCamel;

const camelToSnake = function (line) {
    return fromUpperCase(line).match(/[A-Z][^A-Z]*/g)
        .map(part => part.toLowerCase())
        .join(SNAKE_DELIMITER);
};
exports.camelToSnake = camelToSnake;
