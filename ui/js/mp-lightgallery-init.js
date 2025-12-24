// lightGallery Vanilla-JS Initialisierung für MarketPress (Browser-kompatibel)
// Diese Datei dient als Brücke für die neue lightGallery-Integration.
// Sie kann per wp_enqueue_script eingebunden werden.

window.initProductGalleryLightbox = function(selector, options = {}) {
  if (typeof window.lightGallery !== 'function') {
    console.error('lightGallery library not loaded!');
    return;
  }
  var plugins = [];
  if (window.lgZoom) plugins.push(window.lgZoom);
  if (window.lgThumbnail) plugins.push(window.lgThumbnail);
  var galleryEl = document.querySelector(selector);
  if (!galleryEl) return;
  // Event-Delegation: Klick auf Link öffnet Lightbox und verhindert Standardverhalten
  galleryEl.addEventListener('click', function(e) {
    var target = e.target;
    while (target && target !== galleryEl) {
      if (target.tagName === 'A') {
        e.preventDefault();
        break;
      }
      target = target.parentElement;
    }
  }, true);
  return window.lightGallery(galleryEl, Object.assign({
    plugins: plugins,
    speed: 400,
    closable: true,
    closeOnTap: true,
    escKey: true,
    showCloseIcon: true,
    controls: true,
    download: true,
    width: '90vw',
    height: '90vh',
    maxWidth: '90vw',
    maxHeight: '90vh'
  }, options));
};
