
class BaseTable {
    static column(column) {
        return this.TABLE + '.' + column;
    }
}


module.exports = BaseTable;