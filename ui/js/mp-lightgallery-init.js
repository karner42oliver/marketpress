// lightGallery Vanilla-JS Initialisierung für MarketPress
// Diese Datei dient als Brücke für die neue lightGallery-Integration.
// Sie kann per wp_enqueue_script eingebunden werden.

import lightGallery from 'lightgallery';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

import lgZoom from 'lightgallery/plugins/zoom';
import lgThumbnail from 'lightgallery/plugins/thumbnail';

window.initProductGalleryLightbox = function(selector, options = {}) {
  return lightGallery(document.querySelector(selector), {
    plugins: [lgZoom, lgThumbnail],
    speed: 400,
    ...options
  });
};
