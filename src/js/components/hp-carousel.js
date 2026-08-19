import Splide from '@splidejs/splide';
import '@splidejs/splide/css';

let isHpSplideInitialized = false;

function initHpSplide() {
  // 1. Najdeme přímo samotný Shoptet carousel kdekoli na HP
  const oldCarousel = document.querySelector('#carousel');
  if (!oldCarousel) return;

  const items = oldCarousel.querySelectorAll('.carousel-inner .item');
  if (items.length === 0) return;

  // 2. Extrakce dat ze slidů s ošetřením lazy-loadingu Shoptetu
  const slidesData = [];
  items.forEach((item) => {
    const linkEl = item.querySelector('a');
    const href = linkEl ? linkEl.getAttribute('href') : '#';

    const imgEl = item.querySelector('img');
    const rawSrc = imgEl ? (imgEl.getAttribute('src') || '') : '';
    const dataSrc = imgEl ? (imgEl.getAttribute('data-src') || imgEl.getAttribute('data-original') || '') : '';
    const srcset = imgEl ? (imgEl.getAttribute('srcset') || imgEl.getAttribute('data-srcset') || '') : '';

    let imgSrc = '';
    if (dataSrc) {
      imgSrc = dataSrc;
    } else if (srcset) {
      imgSrc = srcset.split(',')[0].trim().split(' ')[0];
    } else if (rawSrc && !rawSrc.startsWith('data:image')) {
      imgSrc = rawSrc;
    }

    const imgAlt = imgEl ? (imgEl.getAttribute('alt') || '') : '';

    const titleEl = item.querySelector('.extended-banner-title');
    const titleHtml = titleEl ? titleEl.innerHTML : '';

    const descEl = item.querySelector('.extended-banner-text');
    const descHtml = descEl ? descEl.innerHTML : '';

    const linkTextEl = item.querySelector('.extended-banner-link');
    const linkText = linkTextEl ? linkTextEl.textContent.trim() : 'Prozkoumat';

    slidesData.push({
      href,
      imgSrc,
      imgAlt,
      titleHtml,
      descHtml,
      linkText,
    });
  });

  // 3. Sestavení Splide DOM struktury
  const splideContainer = document.createElement('div');
  splideContainer.className = 'splide hp-splide-carousel';
  splideContainer.id = 'hp-splide';

  const splideTrack = document.createElement('div');
  splideTrack.className = 'splide__track';

  const splideList = document.createElement('ul');
  splideList.className = 'splide__list';

  slidesData.forEach((slide) => {
    const slideLi = document.createElement('li');
    slideLi.className = 'splide__slide hp-carousel-slide';

    slideLi.innerHTML = `
      <div class="hp-carousel-slide-container">
        <div class="hp-carousel-content-wrapper">
          <div class="hp-carousel-content">
            <div class="hp-carousel-pretitle">${slide.imgAlt}</div>
            <h2 class="extended-banner-title hp-carousel-title">${slide.titleHtml}</h2>
            <p class="extended-banner-text hp-carousel-text">${slide.descHtml}</p>
            <div class="hp-carousel-action">
              <a href="${slide.href}" class="extended-banner-link carousel-slide-link btn btn-carousel-hp hp-carousel-btn">${slide.linkText}</a>
            </div>
          </div>
        </div>
        <div class="hp-carousel-image-wrapper">
          <a href="${slide.href}" class="hp-carousel-image-link">
            <img src="${slide.imgSrc}" alt="${slide.imgAlt}" class="hp-carousel-image" loading="eager">
          </a>
        </div>
      </div>
    `;
    splideList.appendChild(slideLi);
  });

  splideTrack.appendChild(splideList);
  splideContainer.appendChild(splideTrack);

  // 4. Nahrazení: Najdeme nejbližší .wide-carousel, nebo nahradíme přímo #carousel
  const wideCarouselWrapper = oldCarousel.closest('.wide-carousel');
  if (wideCarouselWrapper) {
    wideCarouselWrapper.innerHTML = '';
    wideCarouselWrapper.appendChild(splideContainer);
  } else if (oldCarousel.parentNode) {
    oldCarousel.parentNode.replaceChild(splideContainer, oldCarousel);
  }

  // 5. Inicializace Splide
  new Splide('#hp-splide', {
    type: 'fade',
    rewind: true,
    autoplay: true,
    interval: 6000,
    speed: 800,
    arrows: true,
    pagination: true,
    pauseOnHover: true,
    pauseOnFocus: true,
    classes: {
      arrows: 'splide__arrows hp-splide-arrows',
      arrow: 'splide__arrow hp-splide-arrow',
      prev: 'splide__arrow--prev hp-splide-arrow--prev',
      next: 'splide__arrow--next hp-splide-arrow--next',
      pagination: 'splide__pagination hp-splide-pagination',
      page: 'splide__pagination__page hp-splide-pagination-page',
    },
  }).mount();
}

function safeInitHpSplide() {
  if (isHpSplideInitialized) return;
  if (!document.body.classList.contains('in-index')) return;

  // Kontrolujeme pouze existenci #carousel kdekoli v těle indexu
  const carousel = document.querySelector('#carousel');
  if (!carousel) return;

  isHpSplideInitialized = true;
  initHpSplide();
}

// Spuštění při Shoptet eventu i fallback
document.addEventListener('ShoptetDOMContentLoaded', safeInitHpSplide);

if (document.readyState === 'complete' || document.readyState === 'interactive') {
  safeInitHpSplide();
}