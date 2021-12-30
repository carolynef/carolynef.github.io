'use strict';

function setupToggle() {
    for (const element of document.getElementsByClassName('toggle')) {
        element.onclick = function (e) {
            e.preventDefault();

            if (this.classList.toggle('active')) {
                if (!document.body.classList.contains('menu-open')) {
                    document.body.classList.add('menu-open');
                }
            } else {
                if (document.body.classList.contains('menu-open')) {
                    document.body.classList.remove('menu-open');
                }
            }
        };
    }
}

setupToggle();