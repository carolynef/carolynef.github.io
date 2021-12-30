'use strict';

function setupRouting() {
    const elements = document.getElementsByClassName('route');

    window.addEventListener('hashchange', function (e) {
        updateCurrent(elements, window.location.hash);
    })

    updateCurrent(elements, window.location.hash);
}

function updateCurrent(elements, hash) {
    for (const element of elements) {
        if ('#' + element.id === hash) {
            element.classList.add('current');
        } else {
            element.classList.remove('current');
        }
    }
}

setupRouting();