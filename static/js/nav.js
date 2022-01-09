'use strict';

function setupToggle() {
    const element = document.getElementById('menu-toggle');

    element.onclick = function (e) {
        e.preventDefault();
        document.body.classList.toggle('menu-open');
    };
}

function getHeaderHeight() {
    return parseFloat(getComputedStyle(document.body).getPropertyValue('--header-size'))
        * parseInt(getComputedStyle(document.body).getPropertyValue('--header-height'));
}

function isTouchDevice() {
    return window.ontouchstart !== undefined;
}

function setupScroll() {
    const scrollUp = "scroll-up";
    const scrollDown = "scroll-down";
    const scrollPastHeader = "scroll-past-header";

    let lastScroll = 0;

    window.addEventListener("scroll", () => {
        const currentScroll = window.pageYOffset;
        const isScrollUp = currentScroll < lastScroll;
        const isScrollDown = currentScroll > lastScroll;

        if (currentScroll <= 0) {
            document.body.classList.remove(scrollUp);
            return;
        }

        if (isScrollDown) {
            if (!document.body.classList.contains(scrollDown)) {
                document.body.classList.remove(scrollUp);
                document.body.classList.add(scrollDown);
            }
        } else if (isScrollUp) {
            if (document.body.classList.contains(scrollDown)) {
                document.body.classList.remove(scrollDown);
                document.body.classList.add(scrollUp);
            }

            if (isTouchDevice()) {
                if (currentScroll < getHeaderHeight()) {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    })
                }
            }
        }

        if (currentScroll >= 16) {
            document.body.classList.add(scrollPastHeader);
        } else {
            document.body.classList.remove(scrollPastHeader);
        }

        lastScroll = currentScroll;
    });
}

setupToggle();
setupScroll();