// ** = MVP
var express = require("express");

var router = express.Router();

// Import the models (mgt.js & pos.js) to use its database functions.
var mgt = require("../models/mgt.js");
var pos = require("../models/pos.js");

// HTML ROUTES
// 
// 
// "/": POS Dashboard
// GET: To load main dashboard **
router.get("/", function (req, res) {
    pos.all_products(function (data) {
        var obj = {
            products: data
        };

        res.render("pos_dash", obj);
    })
});

// "/mgt/sales": MGT Sales Dashboard
// GET: To load sales management dashboard
router.get("/sales", function (req, res) {
    mgt.all_sales(function (data) {
        var obj = {
            sales: data.reverse()
        };

        res.render("mgt_dash_sales", obj);
    })
});

// "/mgt/products": MGT Products Dashboard
// GET: To load product management dashboard
router.get("/products", function (req, res) {
    pos.all_products(function (data) {
        var obj = {
            products: data
        };

        res.render("mgt_dash_products", obj);
    })
});


// API ROUTES
// 

// "/api/products": Add a new product 
// POST
router.post("/api/products", function (req, res) {
    mgt.add_product([req.body.name, req.body.price], function () {
        res.json(true);
    })
})

// "/api/products/:id": Modify the product with the specified ID
// PUT: To modify a specific product's information
router.put("/api/products/:id", function (req, res) {
    mgt.update_product(req.body, req.params.id, function () {
        res.json(true);
    })
})
// DELETE: To delete a specific product
router.delete("/api/products/:id", function (req, res) {
    mgt.delete_product(req.params.id, function () {
        res.json(true);
    })
})

// "/api/sales": Returns a JSON of all sales made since the launch of the POS
// POST: To add a new transaction **
router.post("/api/sales", function (req, res) {
    pos.new_sale(req.body.total, req.body.products, function () {
        res.json(true);
    })
})

// "/api/sales/:id": Returns a JSON of the transaction with the specified ID 
// GET: To retrieve a specific transaction information **
router.get("/api/sales/:id", function (req, res) {
    mgt.sale_by_id(req.params.id, function (data) {
        res.json(data);
    })
})

// Export routes for server.js to use.
module.exports = router;
