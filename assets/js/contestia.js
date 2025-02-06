$(document).ready(function () {

    // Cacheo de selectores que se usan varias veces
    const $menu = $(".menu");
    const $navigations = $(".navigations");
    const $header = $(".header");
    const $mainMenuLinks = $(".main-menu a");
    const $animateElements = $(".animate-element");
    const $window = $(window);
    const $body = $('body');
    const $document = $(document);

    // Función para alternar la visibilidad del menú
    function toggleMenu() {
        $menu.toggleClass("toggle");
        $navigations.toggleClass("toggle");
        $header.toggleClass("toggle");
    }

    // Al hacer clic en el menú
    $menu.click(toggleMenu);

    // Al hacer clic en un enlace del menú principal, cerrar el menú
    $mainMenuLinks.click(function () {
        $menu.removeClass("toggle");
        $navigations.removeClass("toggle");
        $header.removeClass("toggle");
    });

    // Función para animar scroll a una sección
    function smoothScrollTo(target, addHash = true) {
        if ($(target).length) {
            $('html, body').stop().animate({
                'scrollTop': $(target).offset().top
            }, 500, 'swing', function () {
                if (addHash) {
                    window.location.hash = target;
                }
                $document.on("scroll", onScroll);
            });
        }
    }

    // Navegación suave al hacer clic en un enlace con href="#"
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();

        $document.off("scroll");  // Desactivar la función de scroll temporalmente

        // Quitar la clase 'active' de todos los enlaces
        $mainMenuLinks.removeClass('active');

        // Añadir la clase 'active' al enlace actual
        $(this).addClass('active');

        // Desplazar suavemente hacia la sección
        smoothScrollTo(this.hash);
    });

    // Función para verificar si hay un hash en la URL al cargar la página
    function checkInitialHash() {
        if (window.location.hash) {
            const target = window.location.hash;
            const $targetElement = $(target);
            if ($targetElement.length) {
                // Desactivar el evento scroll temporalmente
                $document.off("scroll");

                // Marcar el enlace correspondiente como activo
                $mainMenuLinks.removeClass("active");
                $mainMenuLinks.filter(`[href="${target}"]`).addClass("active");

                // Hacer scroll hasta la sección correspondiente sin cambiar el hash
                smoothScrollTo(target, false);

                // Reactivar el evento de scroll después del desplazamiento
                setTimeout(() => {
                    $document.on("scroll", onScroll);
                }, 600);
            }
        }
    }

    // Función para abrir/cerrar el Lightbox
    $('.js-open-lightbox').on('click', function() {
        const targetId = $(this).data('target');
        const $lightbox = $('#' + targetId);
        
        if ($lightbox.length) {
            $lightbox.addClass('open');
            $body.addClass('openLB')
        }
    });

    // Cerrar lightbox al hacer clic en el botón de cierre
    $('.js-lightbox').on('click', '.js-close-lightbox', function() {
        $(this).closest('.js-lightbox').removeClass('open');
        $body.removeClass('openLB');
    });

    // Cerrar lightbox al hacer clic fuera del contenido
    $('.js-lightbox').on('click', function(e) {
        if ($(e.target).is('.js-lightbox')) {
        $(this).removeClass('open');
        $body.removeClass('openLB');
        }
    });

    // Función que comprueba si al menos el 10% del elemento es visible en el viewport
    function isElementInViewport(el) {
        const elementTop = $(el).offset().top;
        const elementHeight = $(el).outerHeight();
        const elementBottom = elementTop + elementHeight;
        const viewportTop = $window.scrollTop();
        const viewportBottom = viewportTop + $window.height();

        const threshold = elementHeight * 0.10; // Cambiado a 10%

        return elementBottom - threshold > viewportTop && elementTop + threshold < viewportBottom;
    }

    // Función que revisa la visibilidad de los elementos con la clase "animate-element"
    function checkVisibility() {
        $animateElements.each(function () {
            const $this = $(this);
            if (isElementInViewport($this)) {
                $this.removeClass('oculto').addClass('visible');
            } else {
                $this.removeClass('visible').addClass('oculto');
            }
        });
    }

    // Ejecutar al hacer scroll y al cargar la página
    $window.on('scroll resize', checkVisibility);
    checkVisibility(); // Para que se ejecute al cargar la página

    // Función que detecta el scroll actual y resalta el enlace del menú correspondiente
    function onScroll() {
        const scrollPos = $window.scrollTop();

        $mainMenuLinks.each(function () {
            const $currLink = $(this);
            const refElement = $($currLink.attr("href"));

            if (refElement.length && refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                $mainMenuLinks.removeClass("active");
                $currLink.addClass("active");
            }
        });
    }

    // Ejecutar la función al cargar la página
    checkInitialHash();

    // Monitorizar el scroll para cambiar la clase activa del menú
    $document.on("scroll", onScroll);
});