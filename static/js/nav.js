'use strict';

function setupToggle() {
    const element = document.getElementById('menu-toggle');

    element.onclick = function (e) {
        e.preventDefault();
        document.body.classList.toggle('menu-open');
    };
}

setupToggle();