

    /*-------------------------------------------------------------------------------------------------------------------*/


    var totalProducts = 0;

    var quantityInMiniCart = function () {
        totalProducts = 0;
        jQuery.each($(".cart__popup-table-row"), function () {
            totalProducts += parseInt($(".quantity-input__input").val());
            return totalProducts
        });
        $(".cart__popup-products-number").html(totalProducts);
        if (totalProducts > 0) {
            $(".cart__count").html(totalProducts);
        } else {
            $(".cart__count").html("");
            $(".cart__header-popup").addClass("cart__header-popup--empty")
        }
    };
    quantityInMiniCart();

    /*==================================================================================================================*/


    var startTotal = 0;

    jQuery.each($(".cart__popup-table-row"), function () {
        startTotal += parseFloat($(this).find(".js--mini-cart-price").data("price"));
        return startTotal;
    });

    startTotal = parseFloat(startTotal.toFixed(2));

    $(".cart__popup-total-currency .cart__popup-total-price").not($(".cart__popup-total-currency--card .cart__popup-total-price")).text(startTotal);

    /*==================================================================================================================*/

    let productQtyPrice;

    var recountMiniCartProductPrice = function (context) {
        let that = context;
        let productDataPrice = that.parent().siblings(".cart__popup-table-cell--price").find(".js--mini-cart-price").data("price");
        let productQtyVal = that.find(".quantity-input__input").val();
        productQtyPrice = (productDataPrice * productQtyVal).toFixed(2);
    };


    var recountMiniCartTotalPrice = function () {
        startTotal = 0;
        jQuery.each($(".cart__popup-table-row"), function () {
            startTotal += parseFloat($(this).find(".js--mini-cart-price").html());
            return startTotal;
        });
        startTotal = startTotal.toFixed(2);
        // startTotal = parseFloat(startTotal.toFixed(2));
        $(".cart__popup-total-currency .cart__popup-total-price").not($(".cart__popup-total-currency--card .cart__popup-total-price")).text(startTotal);
    };

    /*==================================================================================================================*/

    $(".quantity-input__container").on("click", function (e) {
        if ($(this).hasClass("quantity-input__container--card")) {
            var productCardTotal = $(this).parent().parent().siblings(".cart__popup-total-currency.cart__popup-total-currency--card").find(".cart__popup-total-price");
        }

        var counter = parseInt($(this).find(".quantity-input__input").val());

        if ($(this).find(".quantity-input__btn--plus").is(e.target)) {
            counter++;
            $(this).find(".quantity-input__input").val(counter);
            $(this).find(".quantity-input__btn--minus").prop('disabled', false);
            recountMiniCartProductPrice($(this));
            $(this).parent().siblings(".cart__popup-table-cell--price").find(".js--mini-cart-price").html(productQtyPrice);

            if ($(this).hasClass("quantity-input__container--card")) {
                let productCardDataPrice = productCardTotal.data("product-price");
                let productCardQtyVal = $(this).find(".quantity-input__input").val();
                productCardQtyPrice = (productCardDataPrice * productCardQtyVal).toFixed(2);
                productCardTotal.html(productCardQtyPrice);
            }
        }

        if ($(this).find(".quantity-input__btn--minus").is(e.target)) {

            if (counter > 2) {
                counter--;
                $(this).find(".quantity-input__input").val(counter);
                recountMiniCartProductPrice($(this));

                if ($(this).hasClass("quantity-input__container--card")) {
                    let productCardDataPrice = productCardTotal.data("product-price");
                    let productCardQtyVal = $(this).find(".quantity-input__input").val();
                    productCardQtyPrice = (productCardDataPrice * productCardQtyVal).toFixed(2);
                    productCardTotal.html(productCardQtyPrice);
                }
            } else {
                $(this).find(".quantity-input__btn--minus").prop('disabled', true);
                counter = 1;
                $(this).find(".quantity-input__input").val(counter);
                recountMiniCartProductPrice($(this));

                if ($(this).hasClass("quantity-input__container--card")) {
                    let productCardDataPrice = productCardTotal.data("product-price");
                    let productCardQtyVal = $(this).find(".quantity-input__input").val();
                    productCardQtyPrice = (productCardDataPrice * productCardQtyVal).toFixed(2);
                    productCardTotal.html(productCardQtyPrice);
                }
            }

            $(this).parent().siblings(".cart__popup-table-cell--price").find(".js--mini-cart-price").html(productQtyPrice);
        }

        recountMiniCartTotalPrice();
    });

    /*==================================================================================================================*/

    $(".cart__popup-delete-row").on("click", function () {
        $(this).parent().parent(".cart__popup-table-row").remove();
        recountMiniCartTotalPrice();
        quantityInMiniCart();
    });

    /*==================================================================================================================*/