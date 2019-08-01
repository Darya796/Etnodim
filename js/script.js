$(function () {
    $.fn.parallax = function (resistance, mouse) {
        $el = $(this);
        TweenLite.to($el, 1, {
            x: -((mouse.clientX - window.innerWidth / 2) / resistance),
            y: -((mouse.clientY - window.innerHeight / 2) / resistance)
        });
    };

    /*-------------------------------------------------------------------------------------------------------------------*/

    $(".main-nav__burger").on("click", function () {
        $(this).toggleClass("main-nav__burger--opened");

        if ($(this).hasClass("main-nav__burger--opened")) {
            $(".main-nav__burger-title").html("Close");
        } else {
            $(".main-nav__burger-title").html("Menu");
        }
    });

    /*-------------------------------------------------------------------------------------------------------------------*/

    $(".cart__btn").on("click", function () {
        $(".cart__header-popup-overlay").toggleClass("cart__header-popup-overlay--visible");
        $("body").toggleClass("unscrolled");
    });

    $(".cart__popup-close").on("click", function () {
        $(".cart__header-popup-overlay").removeClass("cart__header-popup-overlay--visible");
        $("body").removeClass("unscrolled");
    });

    $(".cart__header-popup-overlay").on("click", function (e) {
        if ($(".cart__header-popup-overlay").is(e.target) && $(".cart__header-popup-overlay").has(e.target).length === 0) {
            $(".cart__header-popup-overlay").removeClass("cart__header-popup-overlay--visible");
            $("body").removeClass("unscrolled");
        }
    });

    /*-------------------------------------------------------------------------------------------------------------------*/


    var totalProducts = 0;

    var quantityInMiniCart = function () {
        totalProducts = 0;
        jQuery.each($(".cart__popup-table-row"), function () {
            totalProducts += parseInt($(".quantity-input__input").val());
            return totalProducts
        });
        $(".cart__popup-products-numder").html(totalProducts);
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


    /*==================================================================================================================*/

    $('.slider__container').not($(".js--slider__container--blog")).slick({
        // arrows: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        draggable: false,
        swipe: false,
        touchMove: false,
        appendArrows: ".slider__arrows-container",
        infinite: false,
        responsive: [
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            }
        ]

    });

    $('.banners__slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        draggable: false,
        swipe: false,
        touchMove: false,
        appendArrows: ".banners__slider-arrows"
    });

    $('.js--slider__container--blog').slick({
        // arrows: false,
        slidesToShow: 4,
        slidesToScroll: 4,
        draggable: false,
        swipe: false,
        touchMove: false,
        appendArrows: ".slider__arrows-container",
        infinite: false,
        responsive: [
            {
                breakpoint: 1855,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            }
        ]

    });

    /*-------------------------------------------------------------------------------------------------------------------*/

    $(document).on("click", function (e) {
        if ($(e.target).is($(".search__container")) || $(e.target).is($(".search__btn"))) {
            if (!$(".search__container").hasClass("search__container--opened")) {
                $(".search__container").addClass("search__container--opened");
                $(".logo__container").addClass("logo__container--hidden");
                setTimeout(function () {
                    $(".search__input").focus();
                }, 300);
            }
        } else if ($(e.target).is($(".search__input"))) {
        } else if ($(".search__container").hasClass("search__container--opened") && $(".search__input").val() !== "") {
        } else {
            $(".search__container").removeClass("search__container--opened");
            $(".logo__container").removeClass("logo__container--hidden");
        }
    });

    /*==================================================================================================================*/

    $(".banners").mousemove(function (e) {
        $(".sale__img-tree").parallax(-27, e);
        $(".sale__img-fr").parallax(37, e);


        $(".jewelry__inner-img-fr").parallax(37, e);
        $(".jewelry__outer-img-fr").parallax(37, e);
    });
    /*==================================================================================================================*/

    jQuery.each($(".product__color"), function () {
        $(this).css("background", $(this).data("bg"));
    });

    $(".product__color-btn").eq(2).addClass("product__color-btn--checked");
    $(".product__chosen-color").text($(".product__color-btn").eq(2).data("color"));

    $(".product__color-btn").on("click", function () {
        $(this).addClass("product__color-btn--checked");
        $(".product__color-btn").not($(this)).removeClass("product__color-btn--checked");
        $(".product__chosen-color").text($(this).data("color"));
    });
});

