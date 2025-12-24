// Swiper-Bundle für Frontend einbinden
// Dies ist ein Platzhalter für die Integration von Swiper in das MarketPress-Plugin.
// Die Datei wird als Brücke dienen, um Swiper im Theme/Plugin zu laden und zu initialisieren.

import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

window.initProductGallerySwiper = function(selector, options = {}) {
  return new Swiper(selector, {
    // Standardoptionen, können durch options überschrieben werden
    loop: true,
    slidesPerView: 1,
    spaceBetween: 0,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    thumbs: options.thumbs || {},
    ...options
  });
};
