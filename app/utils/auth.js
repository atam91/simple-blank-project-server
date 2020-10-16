const hash = require('pbkdf2-password')();
const uid = require('uid-safe');

const hashPromisified = (options) =>
    new Promise((resolve, reject) => {
        hash(options, (err, pass, salt, hash) => {
            if (err) reject(err);
            resolve({ pass, salt, hash });
        })
    });

const generateSessionToken = () => uid.sync(24);

module.exports = {
    hashPromisified,
    generateSessionToken
};
