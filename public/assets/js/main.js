$(document).ready(function () {
    var cart = {};
    var total = 0;
    var total_div = $("#total");
    var cart_div = $("#cart-summary");
    var emptyCartMsg = $("#empty-cart-msg");

    emptyCartMsg.show();


    var currPath = window.location.pathname;

    switch (currPath) {
        case "/":
            $("#pos-tab").addClass("active");
            break;
        case "/products":
            $("#products-tab").addClass("active");
            break;
        case "/sales":
            $("#sales-tab").addClass("active");
            break;
    }


    $(".nav-link").bind("click", function (event) {
        event.preventDefault();
        var clickedItem = $(this);
        $(".nav-link").each(function () {
            $(this).removeClass("active");
        });
        clickedItem.addClass("active");
    });

    $("[data-link]").click(function () {
        window.location.href = $(this).attr("data-link");
        return false;
    });

    // POS DASH
    $(document).on('click', ".product-pos", function () {
        var product = {};
        product.id = $(this).attr("data-id");
        product.name = $(this).attr("data-name");
        product.price = parseFloat($(this).attr("data-price"));

        // Hide empty cart message
        emptyCartMsg.hide();

        // Detect if the same product is already in the cart
        if (cart[product.id]) {
            // if so, simply edit quantity in stored variable
            cart[product.id].quantity += 1;

            // ... and on the page
            var product_block = $(`#cart-content #product-id-${product.id}`);
            var product_name = $(`<p class="font-weight-bold text-center">${product.name}</p>`);
            var product_total = $(`<p class="text-center">$${product.price} x ${cart[product.id].quantity}</p>`);

            product_block.empty();
            product_block.append(product_name).append(product_total);
            cart_div.append(product_block);

        } else {
            // If not, add new product in stored variable
            product.quantity = 1;
            cart[product.id] = product;

            // ... and add new product block on page
            var product_block = $(`<div>`);
            product_block.attr("id", `product-id-${product.id}`);
            var product_name = $(`<p class="font-weight-bold text-center">${product.name}</p>`);
            var product_total = $(`<p class="text-center">$${product.price} x ${cart[product.id].quantity}</p>`);

            product_block.append(product_name).append(product_total);
            cart_div.append(product_block);

        }

        // Display new total
        total += product.price;
        total_div.text(total.toFixed(2));
    });

    $("#checkout-btn").on('click', function () {
        if (jQuery.isEmptyObject(cart)) {
            bootbox.alert({
                message: "But you aint' got anything in your cart though... 🤔",
                centerVertical: true
            });
            return;
        }

        var newSale = {
            total: total,
            products: cart
        }
        // Add sale to database
        $.ajax("/api/sales", {
            type: "POST",
            data: newSale
        }).then(function () {
            // Send bootstrap alert modal showing order is complete
            bootbox.alert({
                message: "Your order is complete! 🥳",
                centerVertical: true
            });

            // Clear cart in variable and on page
            cart = {};
            cart_div.empty();
            emptyCartMsg.show();


            // Display updated total
            total = 0;
            total_div.text("0.00");

        })

    });

    // MGT PRODUCTS DASH
    $(document).on('click', ".delete-product-btn", function () {

        var id = $(this).attr("data-id");

        bootbox.confirm(
            {
                message: `Are you sure you want to delete this product (ID #${id})?`,
                centerVertical: true,
                callback: function (response) {
                    if (response) {
                        // Send the DELETE request.
                        $.ajax(`/api/products/${id}`, {
                            type: "DELETE"
                        }).then(
                            function () {
                                // TODO: remove product from page
                                $(`.product-mgt[data-id='${id}']`).remove();

                                bootbox.alert({
                                    message: `The product (ID #${id}) has been deleted!`,
                                    centerVertical: true
                                });
                            }
                        );
                    }
                }
            })
    })

    $(document).on('click', ".edit-product-btn", function () {
        var id = $(this).attr("data-id");
        var curr_name = $(this).attr("data-name");
        var curr_price = parseFloat($(this).attr("data-price")).toFixed(2);

        bootbox.confirm({
            message:
                `<form>\
                <div class="form-group">\
                    <label for="new-product-name">Product Name</label>\
                     <input class="form-control" id="new-product-name" value="${curr_name}" required>\
                </div>\
                <div class="form-group">\
                    <label for="new-product-price">Product Price (USD)</label>\
                    <input type="number" class="form-control" id="new-product-price" value="${curr_price}" required>\
                 </div>\
            </form>`,
            centerVertical: true,
            callback: function (response) {
                var updatedProduct = {
                    product_name: $("#new-product-name").val().trim(),
                    price: parseFloat($("#new-product-price").val().trim()).toFixed(2)
                };

                if (response && ((updatedProduct.product_name != curr_name) || (updatedProduct.price != curr_price))) {
                    $.ajax(`/api/products/${id}`, {
                        type: "PUT",
                        data: updatedProduct
                    }).then(
                            function () {
                                // Update product on page
                                $(`#product-${id}-name`).text(updatedProduct.product_name);

                                bootbox.alert({
                                    message: `The product (ID #${id}) has been updated!`,
                                    centerVertical: true
                                });
                            }
                        );
                }
            }
        })


    })

    $("#add-product-btn").on("click", function () {
        bootbox.confirm({
            message:
                `<form>\
                <div class="form-group">\
                    <label for="new-product-name">Product Name</label>\
                     <input class="form-control" id="new-product-name" placeholder="Product Name" required>\
                </div>\
                <div class="form-group">\
                    <label for="new-product-price">Product Price (USD)</label>\
                    <input type="number" class="form-control" id="new-product-price" placeholder="Product Price" required>\
                 </div>\
            </form>`,
            centerVertical: true,
            callback: function (response) {
                var newProduct = {
                    name: $("#new-product-name").val().trim(),
                    price: parseFloat($("#new-product-price").val().trim()).toFixed(2)
                };

                if (response ) {
                    $.ajax(`/api/products`, {
                        type: "POST",
                        data: newProduct
                    }).then(
                            function () {
                                bootbox.alert({
                                    message: `The new product has been added!`,
                                    centerVertical: true,
                                    callback: function() {
                                        location.reload();
                                    }
                                });
                            }
                        );
                }
            }
        })
    })


});