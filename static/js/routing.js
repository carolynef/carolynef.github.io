'use strict';

function setupRouting() {
    const elements = document.getElementsByClassName('route');

    window.addEventListener('hashchange', function (e) {
        updateCurrent(elements, window.location.hash);
    })

    updateCurrent(elements, window.location.hash);
}

function updateCurrent(elements, hash) {
    let category = hash.substring(1);

    let currentElement = null;

    for (const element of elements) {
        if (element.id === category) {
            element.classList.add('current');
            currentElement = element;
        } else {
            element.classList.remove('current');
        }
    }

    // If there is no current element, assume `all` was meant to be selected.
    if (currentElement === null) {
        for (const element of elements) {
            if (element.id === 'all') {
                element.classList.add('current');
            }
        }
    }

    const event = new CustomEvent('categorySelected', {
        bubbles: true,
        detail: {
            category: category
        }
    });

    document.dispatchEvent(event);

    if (currentElement) {
        const topPos = currentElement.getBoundingClientRect().top + window.pageYOffset;

        window.scrollTo({
            top: topPos,
            behavior: 'smooth'
        })
    }
}

setupRouting();