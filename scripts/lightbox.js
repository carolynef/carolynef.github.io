"use strict";

$(document).ready(function () {
    $('div.project figure > img').each(function () {
        var a = $("<a />");
        a.attr("href", $(this).attr("src"));
        a.attr("title", $(this).next("figcaption").text());
        a.addClass("image-popup-vertical-fit");
        $(this).wrap(a);
        $(this).parent().magnificPopup({
            type: 'image',
            closeOnContentClick: true,
            mainClass: 'mfp-img-mobile',
            image: {
                verticalFit: true
            }
        });
    });
});