$(document).ready(function () {
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

});