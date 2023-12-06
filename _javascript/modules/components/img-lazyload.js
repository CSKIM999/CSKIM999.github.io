/**
 * Set up image lazy-load
 */

function stopShimmer($node) {
  $node.parent().removeClass('shimmer');
}

export function imgLazy() {
  const $images = $('#core-wrapper img[data-src]');

  if ($images.length <= 0) {
    return;
  }

  /* Stop shimmer when image loaded */
  document.addEventListener('lazyloaded', function (e) {
    const $img = $(e.target);
    $img.parent().removeClass('shimmer');
  });
  /* Stop shimmer from cached images */
  $images.each(function () {
    if ($(this).hasClass('ls-is-cached')) {
      stopShimmer($(this));
    }
  });
}
