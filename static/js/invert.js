'use strict';

function setupInvert() {
    const element = document.getElementById('categories');

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

setupInvert();