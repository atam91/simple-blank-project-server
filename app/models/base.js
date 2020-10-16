
const getFields = tableFields =>
    tableFields.map(tableField => {
        const [ table, field ] = tableField.split('.');

        return field;
    });


module.exports = {
    getFields,
};