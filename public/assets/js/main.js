import { privateEncrypt } from "crypto";

$(document).ready(function () {
    var cart = [];
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
        // Add product to cart variable

        // Add product to cart on page

        // Display new total
        total += parseFloat($(this).attr("data-price"));
        total_div.text(total);
    });


});