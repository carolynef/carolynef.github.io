'use strict';

function categoryMatches(element, category) {
    if ((category === "all") || (category === "")) {
        return true;
    }

    return element.dataset.category.split(",").includes(category);
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

    window.addEventListener('resize', (e) => {
        const gutter = getGutter(thumbnails);

        if (msnry.gutter == gutter) {
            msnry.layout();
        } else {
            msnry.destroy();
            msnry = createMasonry(thumbnails);
        }
    });
}

setupThumbnails();