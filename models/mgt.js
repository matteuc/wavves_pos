// Model for management 
var orm = require("../config/orm.js");

var mgt = {
    all_sales: function (cb) {
        orm.all("sales", function (res) {
            cb(res);
        })
    },
    sale_by_id: function (sale_id, cb) {
        orm.itemsByCondition("products_sold", `sale_id = ${sale_id}`, function (res) {
            cb(res);
        })
    },
    add_product: function (vals, cb) {
        var cols = ["product_name", "price"];
        orm.create("products", cols, vals, function (res) {
            cb(res);
        });
    },
    delete_product: function (id, cb) {
        orm.delete("products", `id = ${id}`, function (res) {
            cb(res);
        })
    },
    update_product: function (objColVals, id, cb) {
        orm.update("products", objColVals, `id = ${id}`, function (res) {
            cb(res);
        })
    }
}

module.exports = mgt;