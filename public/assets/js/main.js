$(document).ready(function () {
    var cart = {};
    var total = 0;
    var total_div = $("#total");

    $("#empty-cart-msg").show();


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
    $(document).on('click', ".product-block-pos", function () {
        var product = {};
        product.id = $(this).attr("data-id");
        product.name = $(this).attr("data-name");
        product.price = parseFloat($(this).attr("data-price"));

        // Hide empty cart message
        $("#empty-cart-msg").hide();

        // Detect if the same product is already in the cart
        if (cart[product.id]) {
            // if so, simply edit quantity in stored variable
            cart[product.id].quantity += 1;

            // ... and on the page
            var product_block = $(`#cart-content #product-id-${product.id}`);
            var product_name = $(`<p class="text-center">${product.name}</p>`);
            var product_total = $(`<p class="text-center">$${product.price} x ${cart[product.id].quantity}</p>`);

            product_block.empty();
            product_block.append(product_name).append(product_total);

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
        }

        // Display new total
        total += product.price;
        total_div.text(total);
    });


});