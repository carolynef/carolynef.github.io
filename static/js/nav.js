'use strict';

function setupToggle() {
    const element = document.getElementById('menu-toggle');

    element.onclick = function (e) {
        e.preventDefault();
        document.body.classList.toggle('menu-open');
    };
}

function setupScroll() {
    const scrollUp = "scroll-up";
    const scrollDown = "scroll-down";

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

        lastScroll = currentScroll;
    });
}

setupToggle();
setupScroll();