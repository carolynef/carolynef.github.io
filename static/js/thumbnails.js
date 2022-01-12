'use strict';

function taxonomyMatches(element, taxonomy) {
    return element.dataset[taxonomy.name].split(",").includes(taxonomy.term);
}

function getGutter(element) {
    return parseInt(getComputedStyle(element).getPropertyValue('--thumbnail-gutter'));
}

function createMasonry(element) {
    return new Masonry(element, {
        itemSelector: '.thumbnail',
        columnWidth: '.thumbnails-sizer',
        gutter: getGutter(element),
        fitWidth: true,
        horizontalOrder: false
    });
}

function setupThumbnails() {
    const thumbnails = document.querySelector('.thumbnails');
    const items = thumbnails.querySelectorAll('.thumbnail');

    let msnry = createMasonry(thumbnails);

    imagesLoaded(thumbnails).on('progress', function () {
        // layout Masonry after each image loads
        msnry.layout();
    });

    const hiddenClass = 'hidden';

    window.addEventListener('taxonomySelected', (e) => {
        if (e.detail.taxonomy === null) {
            for (const item of items) {
                item.classList.remove(hiddenClass);
            }
        } else {
            for (const item of items) {
                if (taxonomyMatches(item, e.detail.taxonomy)) {
                    item.classList.remove(hiddenClass);
                } else {
                    item.classList.add(hiddenClass);
                }
            }
        }

        msnry.layout();
    });

    window.addEventListener('resize', (e) => {
        const gutter = getGutter(thumbnails);

        if (msnry.gutter == gutter) {
            msnry.layout();
        } else {
            msnry.destroy();
            msnry = createMasonry(thumbnails);
        }
    });

    const elements = document.getElementsByClassName('route');

    window.addEventListener('hashchange', function (e) {
        hashChanged(elements, window.location.hash);
    })

    hashChanged(elements, window.location.hash);
}

function splitHashToTaxonomy(hash) {
    const hashParts = hash.split('__');

    if (hashParts.length != 2) {
        return null;
    }

    return {
        name: hashParts[0],
        term: hashParts[1]
    }
}

function hashChanged(elements, hash) {
    const id = hash.substring(1);
    let currentElement = null;

    for (const element of elements) {
        if (element.id === id) {
            element.classList.add('current');
            currentElement = element;
        } else {
            element.classList.remove('current');
        }
    }

    // If there is no current element, assume `all` was meant to be selected.
    if (currentElement === null) {
        for (const element of elements) {
            console.log(element.id);
            if (element.id === 'all') {
                element.classList.add('current');
            }
        }
    }

    const taxonomy = splitHashToTaxonomy(id);

    const event = new CustomEvent('taxonomySelected', {
        bubbles: true,
        detail: {
            taxonomy: taxonomy
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

setupThumbnails();