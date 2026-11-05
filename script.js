(function () {
  // 헤더 검색폼: 히어로가 헤더 아래로 지나가면 표시
  var header = document.querySelector('.header');
  var hero = document.querySelector('.hero');
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      header.classList.toggle('show-search', !entries[0].isIntersecting);
    }, { rootMargin: '-' + header.offsetHeight + 'px 0px 0px 0px' }).observe(hero);
  }

  // 테마 슬라이더 페이지네이션 (한 페이지 = 3장)
  var slider = document.getElementById('theme-slider');
  var dotsBox = document.getElementById('theme-dots');
  var PER_PAGE = 3;
  var pages = Math.ceil(slider.children.length / PER_PAGE);
  var dots = [];

  function pageWidth() {
    return slider.clientWidth + parseFloat(getComputedStyle(slider).columnGap || 0);
  }
  function setCurrent(i) {
    dots.forEach(function (d, n) { d.setAttribute('aria-current', n === i ? 'true' : 'false'); });
  }
  for (var i = 0; i < pages; i++) {
    (function (n) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'dot';
      b.setAttribute('aria-label', (n + 1) + '번째 페이지');
      b.addEventListener('click', function () {
        slider.scrollTo({ left: n * pageWidth(), behavior: 'smooth' });
      });
      dotsBox.appendChild(b);
      dots.push(b);
    })(i);
  }
  slider.addEventListener('scroll', function () {
    setCurrent(Math.min(pages - 1, Math.round(slider.scrollLeft / pageWidth())));
  }, { passive: true });
  setCurrent(0);

  // 알림받기 토글 (서버 연동 전 임시 동작)
  var notify = document.getElementById('notify-btn');
  notify.addEventListener('click', function () {
    var on = notify.getAttribute('aria-pressed') !== 'true';
    notify.setAttribute('aria-pressed', on);
    notify.textContent = on ? '알림 신청 완료 (취소하려면 클릭)' : '신규 레시피 추가 시 알림받기';
  });
})();
