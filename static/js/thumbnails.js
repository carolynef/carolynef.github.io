'use strict';

function setupThumbnails() {
    var thumbnails = document.querySelector('.thumbnails');

    var msnry = new Masonry(thumbnails, {
        itemSelector: '.thumbnail',
        columnWidth: '.thumbnails-sizer',
        gutter: 16,
        fitWidth: true
    });

    imagesLoaded(thumbnails).on('progress', function () {
        // layout Masonry after each image loads
        msnry.layout();
    });
}

setupThumbnails();