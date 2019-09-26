// Model for POS (customer view)
var orm = require("../config/orm.js");
var moment = require("moment");

var pos = {
    all_products: function (cb) {
        orm.all("products", function (res) {
            cb(res);
        })
    },
    product_by_id: function (id, cb) {
        orm.itemsByCond("products", `id = ${id}`, function (res) {
            cb(res);
        })
    },
    new_sale: function (total, products) {
        var colArray_sale = ["sale_date", "sale_total"];
        var colArray_products = ["sale_id", "product_name"];

        // Get the current date & time
        var sale_date = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");

        orm.create("sales", colArray_sale, [sale_date, total], function (res) {
            cb(res);
            // Get Id of transaction
            var sale_id = res.insertId;

            // Add all products to the 'product_sales' table
            for (product of products) {
                orm.create("products_sold", colArray_products, [sale_id, product.name], function (res) {
                    cb(res);
                });
            }
        });
    }
}

module.exports = pos;