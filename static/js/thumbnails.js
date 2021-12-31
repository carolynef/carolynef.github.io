'use strict';

function setupThumbnails() {
    const thumbnails = document.querySelector('.thumbnails');
    const items = thumbnails.querySelectorAll('.thumbnail');
    const gutter = parseInt(getComputedStyle(thumbnails).getPropertyValue('--thumbnail-gutter'));

    console.log(gutter);

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
            if (e.detail.category === "all" || item.dataset.category === e.detail.category) {
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