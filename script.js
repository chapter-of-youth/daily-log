(function () {
  // 헤더 검색폼: 히어로가 헤더 아래로 지나가면 표시
  var header = document.querySelector('.header');
  var hero = document.querySelector('.hero');
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      header.classList.toggle('show-search', !entries[0].isIntersecting);
    }, { rootMargin: '-' + header.offsetHeight + 'px 0px 0px 0px' }).observe(hero);
  }

  // 테마 슬라이더 (Swiper)
  // 모바일(~960px): 가운데 정렬 + loop, 가운데 슬라이드 이미지를 섹션 배경과 연동
  // 데스크탑(961px~): 3장씩, 카드에 마우스를 올리면 그 이미지로 섹션 배경 교체 (마지막 호버 유지)
  var themeSec = document.querySelector('.theme-bg');
  var layers = themeSec.querySelectorAll('.theme-bg-layer');
  var cards = Array.prototype.slice.call(document.querySelectorAll('.theme-swiper .theme')); // loop 복제 전에 원본 확보
  var curLayer = -1;
  var curSrc = '';

  function setBg(src) {
    if (!src || src === curSrc) return;
    curSrc = src;
    curLayer = (curLayer + 1) % layers.length;
    layers[curLayer].style.backgroundImage = 'url(' + src + ')';
    layers.forEach(function (l, n) { l.classList.toggle('on', n === curLayer); });
  }

  var desktop = window.matchMedia('(min-width: 961px)');
  cards.forEach(function (card) {
    card.addEventListener('mouseenter', function () {
      if (desktop.matches) setBg(card.dataset.bg);
    });
  });
  setBg(cards[0].dataset.bg); // 최초: 첫 슬라이드 이미지

  new Swiper('.theme-swiper', {
    loop: true,
    centeredSlides: true,
    slidesPerView: 1.4,
    slidesPerGroup: 1,
    spaceBetween: 12,
    pagination: { el: '.theme-swiper .swiper-pagination', clickable: true },
    breakpoints: {
      961: { loop: false, centeredSlides: false, slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 20 }
    },
    on: {
      slideChange: function (sw) {
        if (!desktop.matches) setBg(cards[sw.realIndex].dataset.bg);
      }
    }
  });

  // 이런 레시피도 있어요: 띠처럼 계속 흐르는 오토 루프 (delay 0 + 큰 speed + linear)
  var miniEl = document.querySelector('.mini-list');
  var miniSwiper = new Swiper(miniEl, {
    loop: true,
    slidesPerView: 'auto',
    spaceBetween: 20,
    speed: 6000,
    allowTouchMove: false,
    autoplay: { delay: 0, disableOnInteraction: false }
  });

  // 마우스를 올리면 현재 위치에서 멈추고, 벗어나면 다시 흐름
  // (autoplay.pause()는 진행 중인 전환이 끝나야 멈춰서, 현재 translate에 고정시키는 방식 사용)
  miniEl.addEventListener('mouseenter', function () {
    var x = miniSwiper.getTranslate();
    miniSwiper.autoplay.stop();
    miniSwiper.setTransition(0);
    miniSwiper.setTranslate(x);
  });
  miniEl.addEventListener('mouseleave', function () {
    // 전환을 강제로 멈췄기 때문에 transitionend가 오지 않아 animating이 true로 남음 → slideNext가 무시되므로 해제
    miniSwiper.animating = false;
    miniSwiper.autoplay.start();
  });

  // 알림받기 토글 (서버 연동 전 임시 동작)
  var notify = document.getElementById('notify-btn');
  notify.addEventListener('click', function () {
    var on = notify.getAttribute('aria-pressed') !== 'true';
    notify.setAttribute('aria-pressed', on);
    notify.textContent = on ? '알림 신청 완료 (취소하려면 클릭)' : '신규 레시피 추가 시 알림받기';
  });

  // 소개 섹션: 섹션 상단이 화면 위에서 300px 지점을 지나면 단계 li가 순서대로 등장,
  // 다시 위로 스크롤해 그 지점 위로 돌아가면 역순으로 사라짐 (아래로 계속 내려가면 그대로 유지)
  var introSec = document.querySelector('.intro');
  var steps = document.querySelector('.intro-steps');
  if (introSec && steps) {
    steps.classList.add('will-reveal');
    var checkReveal = function () {
      steps.classList.toggle('in-view', introSec.getBoundingClientRect().top <= 300);
    };
    window.addEventListener('scroll', checkReveal, { passive: true });
    checkReveal();
  }

  // 히어로 초콜릿 조각(choco1): 마우스를 천천히 따라 살짝 이동
  var fx = document.querySelector('.hero-choco-fx');
  var bgFx = document.querySelector('.hero-choco-bg');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (fx && !reduce && window.matchMedia('(hover: hover)').matches) {
    var MAX = 14;    // choco1 최대 이동 거리(px)
    var BG_RATIO = 0.6; // choco2는 choco1의 60%만, 반대 방향으로 이동
    var EASE = 0.04; // 낮을수록 천천히 따라옴
    var tx = 0, ty = 0, cx = 0, cy = 0, running = false;

    function tick() {
      cx += (tx - cx) * EASE;
      cy += (ty - cy) * EASE;
      fx.style.setProperty('--fx-x', cx.toFixed(2) + 'px');
      fx.style.setProperty('--fx-y', cy.toFixed(2) + 'px');
      if (bgFx) {
        bgFx.style.setProperty('--bg-x', (-cx * BG_RATIO).toFixed(2) + 'px');
        bgFx.style.setProperty('--bg-y', (-cy * BG_RATIO).toFixed(2) + 'px');
      }
      if (Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05) {
        requestAnimationFrame(tick);
      } else {
        running = false;
      }
    }
    function go() { if (!running) { running = true; requestAnimationFrame(tick); } }

    hero.addEventListener('mousemove', function (e) {
      var r = hero.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2 * MAX;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2 * MAX;
      go();
    });
    hero.addEventListener('mouseleave', function () { tx = 0; ty = 0; go(); });
  }
})();
