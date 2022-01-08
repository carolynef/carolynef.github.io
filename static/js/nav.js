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

function setupScroll() {
    const scrollUp = "scroll-up";
    const scrollDown = "scroll-down";
    const scrollPastHeader = "scroll-past-header";

    let lastScroll = 0;

    window.addEventListener("scroll", () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            document.body.classList.remove(scrollUp);
            return;
        }

        if (currentScroll > lastScroll && !document.body.classList.contains(scrollDown)) {
            document.body.classList.remove(scrollUp);
            document.body.classList.add(scrollDown);
        } else if (
            currentScroll < lastScroll &&
            document.body.classList.contains(scrollDown)
        ) {
            document.body.classList.remove(scrollDown);
            document.body.classList.add(scrollUp);
        }

        if (currentScroll >= getHeaderHeight()) {
            document.body.classList.add(scrollPastHeader);
        } else {
            document.body.classList.remove(scrollPastHeader);
        }

        lastScroll = currentScroll;
    });
}

setupToggle();
setupScroll();