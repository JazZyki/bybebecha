function initHpSplide() {
    const beforeCarouselContainer = document.querySelector('.homepage-box.before-carousel');
    if (!beforeCarouselContainer) return;

    // Find the original carousel element
    const oldCarousel = beforeCarouselContainer.querySelector('#carousel');
    if (!oldCarousel) return;

    // Extract slides data
    const items = oldCarousel.querySelectorAll('.carousel-inner .item');
    if (items.length === 0) return;

    const slidesData = [];
    items.forEach(item => {
        // Extract href from any anchor inside item
        const linkEl = item.querySelector('a');
        const href = linkEl ? linkEl.getAttribute('href') : '#';
        
        // Extract image details
        const imgEl = item.querySelector('img');
        const imgSrc = imgEl ? imgEl.getAttribute('src') : '';
        const imgAlt = imgEl ? imgEl.getAttribute('alt') : '';
        
        // Extract texts
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
            linkText
        });
    });

    // Build the Splide markup
    const splideContainer = document.createElement('div');
    splideContainer.className = 'splide hp-splide-carousel';
    splideContainer.id = 'hp-splide';

    const splideTrack = document.createElement('div');
    splideTrack.className = 'splide__track';

    const splideList = document.createElement('ul');
    splideList.className = 'splide__list';

    slidesData.forEach(slide => {
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

    // Replace the old carousel with the new Splide container
    const wideCarousel = beforeCarouselContainer.querySelector('.wide-carousel');
    if (wideCarousel) {
        wideCarousel.innerHTML = '';
        wideCarousel.appendChild(splideContainer);
    } else {
        oldCarousel.parentNode.replaceChild(splideContainer, oldCarousel);
    }

    // Load Splide assets if not loaded and then initialize
    loadSplideAssets(() => {
        if (typeof Splide !== 'undefined') {
            new Splide('#hp-splide', {
                type: 'fade',
                rewind: true,
                autoplay: true,
                interval: 600000,
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
                }
            }).mount();
        }
    });
}

function loadSplideAssets(callback) {
    if (window.Splide) {
        callback();
        return;
    }

    // Load CSS dynamically if not present
    if (!document.querySelector('link[href*="splide"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/css/splide.min.css';
        document.head.appendChild(link);
    }

    // Load JS dynamically if not present
    if (!document.querySelector('script[src*="splide"]')) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/js/splide.min.js';
        script.onload = callback;
        document.head.appendChild(script);
    } else {
        // If script is already in document but window.Splide is not ready yet, wait for it
        const checkInterval = setInterval(() => {
            if (window.Splide) {
                clearInterval(checkInterval);
                callback();
            }
        }, 50);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHpSplide);
} else {
    initHpSplide();
}