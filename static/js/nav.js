'use strict';

function setupToggle() {
    for (const element of document.getElementsByClassName('toggle')) {
        element.onclick = function () {
            this.classList.toggle('active');
        };
    }
}

setupToggle();