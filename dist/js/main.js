/*============================
   js index
==============================

==========================================*/

(function($) {
    var swiper = new Swiper('.swiper-container', {
        loop: true,
        speed: 2000,

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    });

    /*================================
    Window Load
    ==================================*/
    $(window).on('load', function() {
        smoothScrolling($(".main-menu nav ul li a[href^='#']"), headerHeight);
        smoothScrolling($(".scrollup a[href^='#']"), 0);
        $('.slider-two').addClass('scontent_loaded');
        $('.slider-parallax').addClass('scontent_loaded');
        sliderLoadedAddClass();
        preloader()
    })



    /*================================
    Preloader
    ==================================*/
      /*------------------------------------------
        = HIDE PRELOADER
    -------------------------------------------*/
    function preloader() {
        if($('.preloader').length) {
            $('.preloader').delay(100).fadeOut(500, function() {
            });
        }
    }

    /*================================
     sticky-header
     ==================================*/
    $(window).scroll(function() {

        if ($(window).scrollTop() > 10) {
            $('.scrollup').addClass('show_hide');
        } else {
             $('.scrollup').removeClass('show_hide');
        }

    });

    /*================================
     Gift-carousel
     ==================================*/
    function gift_carousel() {
        var owl = $(".blog-img");
        owl.owlCarousel({
            loop: true,
            margin: 0,
            navText: false,
            smartSpeed: 1500,
            nav: true,
            dots: false,
            navText: ['<i class="ti-arrow-left"></i>', '<i class="ti-arrow-right"></i>'],
            center: false,
            responsive: {
                0: {
                    items: 1
                },
                480: {
                    items: 1
                },
                760: {
                    items: 1
                },
                1080: {
                    items: 1
                }
            }
        });
    }
    gift_carousel();

    /*================================
    slicknav
    ==================================*/
    $('.site-header .nav_mobile_menu').slicknav({
        prependTo: ".mobile_menu"
    });


    /*================================
    slider-area content effect
    ==================================*/
    function sliderLoadedAddClass() {
        $('.slider-two').addClass('scontent_loaded');
        $('.slider-parallax').addClass('scontent_loaded');
    }


    /*================================
      Isotope Portfolio
     ==================================*/
    $('.grid').imagesLoaded(function() {

        // filter items on button click
        $('.gallery-menu').on('click', 'button', function() {
            var filterValue = $(this).attr('data-filter');
            $grid.isotope({
                filter: filterValue
            });
        });

        // init Isotope
        var $grid = $('.grid').isotope({
            itemSelector: '.grid-item',
            percentPosition: true,
            masonry: {
                // use outer width of grid-sizer for columnWidth
                columnWidth: '.grid-item',
            }
        });



    });

    $('.gallery-menu button').on('click', function() {
        $('.gallery-menu button').removeClass('active');
        $(this).addClass('active');
    });


    /*------------------------------------------
        = COUNTDOWN CLOCK
    -------------------------------------------*/
    if ($("#clock").length) {
        $('#clock').countdown('2018/12/08', function(event) {
            var $this = $(this).html(event.strftime('' +
                '<div class="box"><div>%D</div> <span>Days</span> </div>' +
                '<div class="box"><div>%H</div> <span>Hours</span> </div>' +
                '<div class="box"><div>%M</div> <span>Mins</span> </div>' +
                '<div class="box"><div>%S</div> <span>Secs</span> </div>'));
        });
    }

    /*================================
     Variable Initialize
    ==================================*/
    var headerHeight = $('.header-area').innerHeight();


    //. smooth scrolling
    function smoothScrolling($links, $topGap) {
        var links = $links;
        var topGap = $topGap;

        links.on("click", function() {
            if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
                if (target.length) {
                    $("html, body").animate({
                        scrollTop: target.offset().top - topGap
                    }, 1000, "easeInOutExpo");
                    return false;
                }
            }
            return false;
        });
    }

//.scrolltop
    $(function() {
        $('.scrollup').on('click', function(event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top - 1
            }, 1000, 'easeInOutExpo');
            event.preventDefault();
        });
        $('body').attr('id', 'scrolltop');
    });


    /*================================
    Magnific Popup
    ==================================*/
    if ($(".expand-img").length) {
        $('.expand-img').magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            }
        });

        $('.expand-video').magnificPopup({
            type: 'iframe',
            gallery: {
                enabled: true
            }
        });
    }

     /*------------------------------------------
        = STICKY HEADER
    -------------------------------------------*/

    // Function for clone an element for sticky menu
    function cloneNavForSticyMenu($ele, $newElmClass) {
        $ele.addClass('original').clone().insertAfter($ele).addClass($newElmClass).removeClass('original');
    }

    // clone home style 1 navigation for sticky menu
    if(window.innerWidth > 991) {
        if ($('.site-header ').length) {
            cloneNavForSticyMenu($('.site-header'), "sticky-header-menu");
        }
    }

    var lastScrollTop = '';

    function stickyMenu($targetMenu, $toggleClass) {
        var st = $(window).scrollTop();
        var mainMenuTop = $('.site-header .navigation');

        if ($(window).scrollTop() > 1000) {
            if (st > lastScrollTop) {
                // hide sticky menu on scroll down
                $targetMenu.removeClass($toggleClass);

            } else {
                // active sticky menu on scroll up
                $targetMenu.addClass($toggleClass);
            }

        } else {
            $targetMenu.removeClass($toggleClass);
        }

        lastScrollTop = st;
    }


    /*------------------------------------------
        = BACK TO TOP BTN SETTING
    -------------------------------------------*/
    function toggleBackToTopBtn() {
        var amountScrolled = 1000;
        if ($(window).scrollTop() > amountScrolled) {
            $("a.back-to-top").fadeIn("slow");
        } else {
            $("a.back-to-top").fadeOut("slow");
        }
    }

    $(".back-to-top").on("click", function() {
        $("html,body").animate({
            scrollTop: 0
        }, 700);
        return false;
    })

    /*==========================================================================
        WHEN WINDOW SCROLL
    ==========================================================================*/
    $(window).on("scroll", function() {

        if ($(".site-header").length && (window.innerWidth > 991)) {
            stickyMenu( $('.site-header '), "sticky-on" );
        }

        toggleBackToTopBtn();

        if(window.innerWidth < 992) {
            var scroll = $(window).scrollTop();
            if (scroll >= 500) {
                $(".site-header").addClass("mobile-sticky-menu");
            } else {
                $(".site-header").removeClass("mobile-sticky-menu");
            }
        }


    });

    /*------------------------------------------
        = RSVP FORM SUBMISSION
    -------------------------------------------*/
    if ($("#rsvp-form").length) {
        $("#rsvp-form").validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                email: "required",

                guest: {
                    required: true
                },

                events: {
                    required: true
                }

            },

            messages: {
                name: "Please enter your name",
                email: "Please enter your email",
                guest: "Select your number of guest",
                events: "Select your event list"
            },

            submitHandler: function (form) {
                $("#loader").css("display", "inline-block");
                $.ajax({
                    type: "POST",
                    url: "mail.php",
                    data: $(form).serialize(),
                    success: function () {
                        $( "#loader").hide();
                        $( "#success").slideDown( "slow" );
                        setTimeout(function() {
                        $( "#success").slideUp( "slow" );
                        }, 3000);
                        form.reset();
                    },
                    error: function() {
                        $( "#loader").hide();
                        $( "#error").slideDown( "slow" );
                        setTimeout(function() {
                        $( "#error").slideUp( "slow" );
                        }, 3000);
                    }
                });
                return false;
            }
        });
    }

     /*------------------------------------------
        = POPUP VIDEO
    -------------------------------------------*/
    if ($(".video-btn").length) {
        $(".video-btn").on("click", function(){
            $.fancybox({
                href: this.href,
                type: $(this).data("type"),
                'title'         : this.title,
                helpers     : {
                    title : { type : 'inside' },
                    media : {}
                },

                beforeShow : function(){
                    $(".fancybox-wrap").addClass("gallery-fancybox");
                }
            });
            return false
        });
    }
    /*------------------------------------------
        = WATER RIPPLE
    -------------------------------------------*/
    if ($(".ripple").length) {
        $('.ripple').ripples({
            resolution: 512,
            dropRadius: 20, //px
            perturbance: 0.04,
        });

        // Automatic drops
        setInterval(function() {
            var $el = $('.ripple');
            var x = Math.random() * $el.outerWidth();
            var y = Math.random() * $el.outerHeight();
            var dropRadius = 20;
            var strength = 0.04 + Math.random() * 0.04;

            $el.ripples('drop', x, y, dropRadius, strength);
        }, 400);
    }

    /*------------------------------------------
        = VIDEO BACKGROUND
    -------------------------------------------*/
    if ($("#video-background").length) {
        $('#video-background').YTPlayer({
            showControls: false,
            playerVars: {
                modestbranding: 0,
                autoplay: 1,
                controls: 1,
                showinfo: 0,
                wmode: 'transparent',
                branding: 0,
                rel: 0,
                autohide: 0,
                origin: window.location.origin
            }
        });
    }



}(jQuery));