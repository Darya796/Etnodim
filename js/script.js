$("a[href='#']").on("click", function (e) {
   e.preventDefault();
});


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

    $(".cart__btn").not(".cart__btn--cart-page").on("click", function () {
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



    /*==================================================================================================================*/

    $('.slider__container').not($(".js--slider__container--blog")).not($(".slider__container--catalog")).slick({
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
        // $(".sale__img-tree").parallax(-27, e);
        // $(".sale__img-fr").parallax(37, e);


        // $(".jewelry__inner-img-fr").parallax(37, e);
        // $(".jewelry__outer-img-fr").parallax(37, e);
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

