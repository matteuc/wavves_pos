$(document).ready(function () {
    // MGT PRODUCTS DASH
    $(document).on('click', ".delete-product-btn", function () {

        var id = $(this).attr("data-id");

        bootbox.confirm({
            message: `Are you sure you want to delete this product (ID #${id})?`,
            centerVertical: true,
            buttons: {
                confirm: {
                    label: 'Delete'
                }
            },
            callback: function (response) {
                if (response) {
                    // Send the DELETE request.
                    $.ajax(`/api/products/${id}`, {
                        type: "DELETE"
                    }).then(
                        function () {
                            // remove product from page
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
            message: `<form>\
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
            buttons: {
                confirm: {
                    label: 'Update'
                }
            },
            callback: function (response) {
                var name = $("#new-product-name").val().trim();
                var price = $("#new-product-price").val();

                if ((name == '') || !($.isNumeric(price)) || (name === null)) {
                    bootbox.alert({
                        message: `The product was not updated. Both a valid name and price must be provided.`,
                        centerVertical: true
                    });
                    return;
                }
                var updatedProduct = {
                    product_name: name,
                    price: parseFloat(price).toFixed(2)
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
            message: `<form>\
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
            buttons: {
                confirm: {
                    label: 'Create Product'
                }
            },
            callback: function (response) {
                var name = $("#new-product-name").val().trim();
                var price = $("#new-product-price").val();

                if ((name == '') || !($.isNumeric(price)) || (name === null)) {
                    bootbox.alert({
                        message: `No product was created. Both a valid name and price must be provided.`,
                        centerVertical: true
                    });
                    return;
                }

                var newProduct = {
                    name: name,
                    price: parseFloat(price).toFixed(2)
                };

                if (response) {
                    $.ajax(`/api/products`, {
                        type: "POST",
                        data: newProduct
                    }).then(
                        function () {
                            bootbox.alert({
                                message: `The new product has been added!`,
                                centerVertical: true,
                                callback: function () {
                                    location.reload();
                                }
                            });
                        }
                    );
                }
            }
        })
    })

    // MGT SALES DASH
    $(document).on('click', ".sale-block", function () {
        var id = $(this).attr("data-id");
        var total = $(this).attr("data-total");
        var date = $(this).attr("data-date");

        $.get(`/api/sales/${id}`, function (data) {
            var products = data;

            var product_div = $("<div class='card text-center'>");
            var product_div_header = $("<div class='card-header text-center'>");
            product_div_header.text(`Transaction ID #${id}`);
            var product_div_header_date = $("<p class='text-center text-muted'>");
            product_div_header_date.text(date);
            product_div_header_date.appendTo(product_div_header);

            var product_list = $("<div class='card-body'>");
            var product_div_footer = $('<div class="card-footer text-muted text-center">');
            product_div_footer.html(`Total: $<strong>${total}</strong>`);

            $.each(products, function (idx, product) {
                var product_block = $(`<div>`);
                var product_name = $(`<p class="font-weight-bold text-center">${product.product_name}</p>`);
                var product_total = $(`<p class="text-center">$${product.price} x ${product.quantity}</p>`);

                product_block.append(product_name).append(product_total);
                product_list.append(product_block);
            })

            product_div.append(product_div_header).append(product_list).append(product_div_footer);

            bootbox.alert({
                message: product_div.html(),
                centerVertical: true,
                closeButton: false
            })
        })

    })
})