///// FIXME DROP cause useless   maybe??

const baseUtils = require('./base');
const stringUtils = require('./string');

const convertKeysToRaw = baseUtils.genMapObjectKeys(stringUtils.camelToSnake);
const convertKeysFromRaw = baseUtils.genMapObjectKeys(stringUtils.snakeToCamel);
exports.convertKeysToRaw = convertKeysToRaw;
exports.convertKeysFromRaw = convertKeysFromRaw;
