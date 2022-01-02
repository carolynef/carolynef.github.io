'use strict';

function categoryMatches(element, category) {
    if ((category === "all") || (category === "")) {
        return true;
    }

    return element.dataset.category === category;
}

function setupThumbnails() {
    const thumbnails = document.querySelector('.thumbnails');
    const items = thumbnails.querySelectorAll('.thumbnail');
    const gutter = parseInt(getComputedStyle(thumbnails).getPropertyValue('--thumbnail-gutter'));

    const msnry = new Masonry(thumbnails, {
        itemSelector: '.thumbnail',
        columnWidth: '.thumbnails-sizer',
        gutter: gutter,
        fitWidth: true
    });

    imagesLoaded(thumbnails).on('progress', function () {
        // layout Masonry after each image loads
        msnry.layout();
    });

    const hiddenClass = 'hidden';

    window.addEventListener('categorySelected', (e) => {
        for (const item of items) {
            if (categoryMatches(item, e.detail.category)) {
                item.classList.remove(hiddenClass);
            } else {
                item.classList.add(hiddenClass);
            }
        }

        msnry.layout();
    });

    thumbnails.addEventListener('resize', (e) => {
        msnry.layout();
    });
}

setupThumbnails();