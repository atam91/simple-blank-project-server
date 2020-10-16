const defaultConfig = require('./default');
const localConfig = require('./local');


module.exports = Object.assign(defaultConfig, localConfig);