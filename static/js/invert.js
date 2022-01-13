'use strict';

function isTouchDevice() {
    return window.ontouchstart !== undefined;
}

function setupInvert() {
    const element = document.getElementById('categories').querySelector('ul');

    if (!isTouchDevice()) {
        element.addEventListener('mouseenter', e => {
            if (!document.body.classList.contains('invert')) {
                document.body.classList.add('invert');
            }
        });

        element.addEventListener('mouseleave', e => {
            if (document.body.classList.contains('invert')) {
                document.body.classList.remove('invert');
            }
        });
    }
}

setupInvert();