$(document).ready(function () {
    var windowWidth = $(window).width();
    // MENU
    /* prefix +/- icon to mobile menu items, depending on whether they have a submenu */
    $("nav ul li a:has(~ul)").addClass("subMenu");
    $("nav > ul > li a:not([class*='subMenu'])").addClass("noSubMenu");
    $("nav > ul > li > ul > li a").removeClass("noSubMenu");

    /* reveal sub menus on click of parent li */
    $("nav ul li ul").css({ 'display': 'none' });
    $(".subMenu").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        if ($('#openMenu').css('display') === 'block') {
            /* mobile size */
            $(this).closest('li').children('ul').toggle();
        } else {
            /* desktop size */
            // if the submenu is already displayed then toggle it off
            if ($(this).closest('li').children('ul').css('display') == 'block') {
                $(this).closest('li').children('ul').toggle();
            } else {
                // hide any other submenus that are open
                $("nav ul li ul").css({ 'display': 'none', 'opacity': '0' });
                $('nav > ul > li > a').removeClass('subMenuOpen');
                // show this submenu
                $(this).closest('li').children('ul').css({ 'display': 'block' });
            }
        }
        // reading existing opacity value is also required in order to compute transition start value
        if ($(this).closest('li').children('ul').css('opacity') == 0) {
            $(this).closest('li').children('ul').css({ 'opacity': '1' });
        } else {
            $(this).closest('li').children('ul').css({ 'opacity': '0' });
        }
        $(this).toggleClass('subMenuOpen');
    });

    /* open/close mobile menu */
    $('#openMenu').on('click', openMenu);

    $(window).on('resize', function () {
        if ($(window).width() != windowWidth) {
            windowWidth = $(window).width();
            $('nav ul li > ul').css({ 'display': 'none', 'opacity': '0' });
            if ($('#openMenu').css('display') === 'block') {
                /* mobile size */
                $('.subMenuOpen').addClass('subMenu').removeClass('subMenuOpen'); // set the - icons back to a +
                $('nav').css({ 'display': 'none', 'right': '-60%', 'position': 'absolute' });
                $('#openMenu').className = "menuOpen";
                $('#container').css({ 'left': '0' });
                mobileDOM();
            } else {
                /* desktop size */
                $('nav > ul > li > a').removeClass('subMenuOpen');
                var navContent = $("nav > ul").length;
                if (navContent >= 1) {
                    $('#container').css({ 'left': '0' });
                    $('nav').css({ 'display': 'block', 'position': 'relative', 'right': '0' });
                    $("nav > ul:nth-child(3)").appendTo($("header > div div:nth-child(2)"));
                    $("nav form").appendTo($("header > div div:nth-child(2) ul > li:last-of-type"));
                }
            }
        }
    });

    // remove sub menu if click anywhere else on page
    $(document).click(function (e) {
        if ($('nav ul').css('border-width') === '0px') {
        // close any sub-menus if click anywhere else on page
        $("nav ul li ul").css({ 'display': 'none', 'opacity': '0' });
        $('nav > ul > li > a').removeClass('subMenuOpen');
        }
    });

$(".show-more a").on("click", function() {
    var $this = $(this);
    var $content = $this.parent().prev("div.moreContent");
    var linkText = $this.text().toUpperCase();

    if(linkText === "SHOW MORE"){
        linkText = "Show less";
        $content.addClass('showContent').removeClass('hideContent');
    } else {
        linkText = "Show more";
        $content.addClass('hideContent').removeClass('showContent');
    };

    $this.text(linkText);
});

    function mobileDOM() {
        var navContent = $("nav > ul").length;
        if (navContent == 1) {
            $("nav").append($("header > div div:nth-child(2) ul"));
            $("nav").prepend($("nav > ul:nth-child(2) li:last-of-type form"));
        }
    }

    function openMenu() {
        var el = this;
        var headerClone = $("header").clone();
        var headerAttributes = $('header').attr('style');
        /* toggle menu icon background image and transition menu */
        if (el.className != "menuClose") {
            /* code to run when menu is open */
            mobileDOM();
            $('nav').css('display', 'block');
            $('nav').css({ 'right': '-60%' });
            $('#container').css({ 'left': '-60%' });
            el.className = "menuClose";
        }
        else if (el.className == "menuClose") {
            /* code to run when menu closes */
            el.className = "menuOpen";
            $('nav').css({ 'right': '-60%' });
            $('#container').css({ 'left': '0' });

            // wait for transition to end then set nav to display none
            setTimeout(function () {
                $('nav').css('display', 'none');
            }, 400);

        }
    }
});
