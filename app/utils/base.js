
const wrapAsync = (fn) => {
    return function(req, res, next) {
        // Make sure to `.catch()` any errors and pass them along to the `next()`
        // middleware in the chain, in this case the error handler.
        fn(req, res, next).catch(next);
    };
};
exports.wrapAsync = wrapAsync;


const objectFlip = (obj) => {
    return Object.keys(obj)
        .reduce((acc, key) => Object.assign(acc, { [obj[key]]: key }), {})
};
exports.objectFlip = objectFlip;


const accumulateToObject = (list, partCb) => list.reduce(
    (acc, cur, index) => Object.assign(acc, partCb(cur, index)),
    {}
);
exports.accumulateToObject = accumulateToObject;

const genAccumulateToObject = (partCb) => (list) => accumulateToObject(list, partCb);
exports.genAccumulateToObject = genAccumulateToObject;


const genObjectAccumFrom = (obj) => (prev, key) => {
    prev[key] = obj[key];
    return prev;
};
exports.genObjectAccumFrom = genObjectAccumFrom;



/// cb(val, key)
const mapObject = (obj, cb) => {
    return Object.keys(obj).reduce((prev, key) => {
        prev[key] = cb(obj[key], key);
        return prev;
    }, {});
};
exports.mapObject = mapObject;


const mapObjectKeys = (obj, cb) =>
    accumulateToObject(Object.keys(obj), key => ({ [cb(key)]: obj[key] }));
exports.mapObjectKeys = mapObjectKeys;

const genMapObjectKeys = cb => obj => mapObjectKeys(obj, cb);
exports.genMapObjectKeys = genMapObjectKeys;


const getObjectAllowedFields = (obj, fields) => {
    return Object.keys(obj)
        .reduce(
            (prev, key) => Object.assign(prev, fields.includes(key) && { [key]: obj[key] }),
            {}
        );
};
exports.getObjectAllowedFields = getObjectAllowedFields;



/// cb(val, key)
const filterObject = (obj, cb) => {
    return Object.keys(obj)
        .filter(key => cb(obj[key], key))
        .reduce(genObjectAccumFrom(obj), {});
};
exports.filterObject = filterObject;
