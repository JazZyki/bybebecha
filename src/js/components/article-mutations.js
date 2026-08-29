let isArticleInitialized = false;

async function fetchProductData(url, fallbackTitle = '') {
  const cacheKey = `bebecha_product_cache_v2_${url}`;
  const cached = sessionStorage.getItem(cacheKey);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {}
  }

  try {
    const fetchUrl = url.startsWith('http') ? url : new URL(url, window.location.origin).href;
    const res = await fetch(fetchUrl);
    if (!res.ok) {
      console.warn('[ArticleProducts] HTTP chyba při načítání:', fetchUrl, res.status);
      return null;
    }
    const htmlText = await res.text();
    const doc = new DOMParser().parseFromString(htmlText, 'text/html');

    // Název produktu
    let title =
      doc.querySelector('h1[itemprop="name"]')?.textContent?.trim() ||
      doc.querySelector('.p-detail-inner-header h1')?.textContent?.trim() ||
      doc.querySelector('.p-detail-inner h1')?.textContent?.trim() ||
      doc.querySelector('.p-info-wrapper h1')?.textContent?.trim() ||
      doc.querySelector('.product-top h1')?.textContent?.trim() ||
      doc.querySelector('.p-detail h1')?.textContent?.trim() ||
      doc.querySelector('h1[data-testid="productTitle"]')?.textContent?.trim() ||
      doc.querySelector('meta[property="og:title"]')?.getAttribute('content') ||
      fallbackTitle ||
      '';

    if (title && title.includes('|')) {
      title = title.split('|')[0].trim();
    }

    // Hlavní obrázek produktu
    let image = doc.querySelector('meta[property="og:image"]')?.getAttribute('content') || '';

    if (!image) {
      const mainImg = doc.querySelector('.p-main-image img, .p-image img, [itemprop="image"]');
      const dataSrc = mainImg?.getAttribute('data-src') || mainImg?.getAttribute('data-original');
      const src = mainImg?.getAttribute('src');
      image = dataSrc || (src && !src.startsWith('data:image') && !src.includes('blank.gif') ? src : '') || '';
    }

    if (!image) {
      image =
        doc.querySelector('a.p-main-image')?.getAttribute('href') ||
        doc.querySelector('.p-image a')?.getAttribute('href') ||
        '';
    }

    if (image && !image.startsWith('http') && !image.startsWith('//')) {
      image = new URL(image, window.location.origin).href;
    }

    // Cena produktu
    const price =
      doc.querySelector('.p-final-price-wrapper .price-final')?.textContent?.trim() ||
      doc.querySelector('.price-final')?.textContent?.trim() ||
      doc.querySelector('.price-final-holder')?.textContent?.trim() ||
      doc.querySelector('.price-standard')?.textContent?.trim() ||
      doc.querySelector('.price-save')?.textContent?.trim() ||
      doc.querySelector('.price-wrapper .price')?.textContent?.trim() ||
      doc.querySelector('[data-testid="productPrice"]')?.textContent?.trim() ||
      doc.querySelector('[itemprop="price"]')?.textContent?.trim() ||
      '';

    if (!title && !image) {
      console.warn('[ArticleProducts] Nenalezen název ani obrázek pro URL:', url);
      return null;
    }

    const data = { title, image, price, url };
    sessionStorage.setItem(cacheKey, JSON.stringify(data));
    return data;
  } catch (err) {
    console.error('[ArticleProducts] Chyba při načítání produktu:', url, err);
    return null;
  }
}

async function renderArticleProductsWidget(articleContent) {
  if (document.querySelector('.article-products-widget')) return;

  const links = Array.from(articleContent.querySelectorAll('a[href]'));
  const productLinksMap = new Map();

  const excludedExactPaths = new Set([
    '', '/', '/blog', '/blog/', '/clanky', '/clanky/',
    '/kosik', '/kosik/', '/objednavka', '/objednavka/',
    '/login', '/login/', '/obchodni-podminky', '/obchodni-podminky/',
    '/imunita', '/imunita/'
  ]);

  const currentHost = window.location.hostname.replace(/^www\./, '');

  links.forEach((a) => {
    const href = a.getAttribute('href');
    if (!href) return;

    if (
      href.startsWith('#') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('javascript:') ||
      href.includes('/user/documents') ||
      href.match(/\.(jpg|jpeg|png|gif|webp|svg|pdf|zip)$/i)
    ) {
      return;
    }

    try {
      const parsedUrl = new URL(href, window.location.origin);
      const linkHost = parsedUrl.hostname.replace(/^www\./, '');
      const isInternal =
        linkHost === currentHost ||
        linkHost.includes('bybebecha') ||
        linkHost.includes('myshoptet') ||
        linkHost === 'localhost' ||
        linkHost === '127.0.0.1';

      if (
        isInternal &&
        parsedUrl.pathname !== window.location.pathname &&
        !excludedExactPaths.has(parsedUrl.pathname) &&
        !parsedUrl.pathname.startsWith('/blog/') &&
        !parsedUrl.pathname.startsWith('/clanky/')
      ) {
        const productPath = parsedUrl.pathname;
        if (!productLinksMap.has(productPath)) {
          const fallbackTitle = a.getAttribute('title')?.trim() || a.textContent?.trim() || '';
          productLinksMap.set(productPath, fallbackTitle);
        }
      }
    } catch (e) {}
  });

  console.log('[ArticleProducts] Nalezené URL produktů v článku:', Array.from(productLinksMap.keys()));

  if (productLinksMap.size === 0) return;

  const products = (
    await Promise.all(
      Array.from(productLinksMap.entries()).map(([url, fallbackTitle]) =>
        fetchProductData(url, fallbackTitle)
      )
    )
  ).filter(Boolean);

  console.log('[ArticleProducts] Úspěšně načtené produkty:', products);

  if (products.length === 0 || document.querySelector('.article-products-widget')) return;

  const widget = document.createElement('section');
  widget.className = 'article-products-widget';
  widget.innerHTML = `
    <div class="article-products-widget__header">
      <h3 class="article-products-widget__title"><strong>Produkty</strong> zmíněné v článku</h3>
    </div>
    <div class="article-products-widget__grid">
      ${products
        .map(
          (p) => `
        <div class="article-product-card">
          <a href="${p.url}" class="article-product-card__image-link" title="${p.title}">
            ${p.image ? `<img src="${p.image}" alt="${p.title}" class="article-product-card__image" loading="lazy">` : ''}
          </a>
          <div class="article-product-card__body">
            <a href="${p.url}" class="article-product-card__name" title="${p.title}">${p.title}</a>
            ${p.price ? `<div class="article-product-card__price">${p.price}</div>` : ''}
            <a href="${p.url}" class="article-product-card__btn btn btn-secondary has-arrow">Zobrazit</a>
          </div>
        </div>
      `
        )
        .join('')}
    </div>
  `;

  const sidebar = document.querySelector('aside .sidebar-inner, #sidebar .sidebar-inner, .sidebar-inner');
  const isSidebarVisible =
    sidebar &&
    window.innerWidth > 768 &&
    window.getComputedStyle(sidebar).display !== 'none' &&
    sidebar.offsetWidth > 0;

  if (isSidebarVisible) {
    sidebar.insertAdjacentElement('afterbegin', widget);
  } else {
    const paragraphs = Array.from(articleContent.querySelectorAll('p')).filter(
      (p) => !p.closest('.our-tip') && !p.closest('.article-products-widget')
    );

    if (paragraphs.length >= 6) {
      paragraphs[Math.min(5, paragraphs.length - 1)].insertAdjacentElement('afterend', widget);
    } else {
      articleContent.insertAdjacentElement('beforeend', widget);
    }
  }
}

function initArticleMutations() {
  if (isArticleInitialized) return;

  const articleContent = document.querySelector(
    '.type-posts-detail .news-item-detail .text, .news-item-detail .text, .type-posts-detail .content-inner .text, .type-posts-detail .text, .pageArticleDetail'
  );
  
  if (articleContent) {
    isArticleInitialized = true;
    renderArticleProductsWidget(articleContent);
  }

  const topPtoductsTitle = document.querySelector('.box-topProducts .pageElement__heading');
  if (topPtoductsTitle) {
    topPtoductsTitle.innerHTML = '<strong>Top 10</strong> produktů';
  }

  const articleHeader = document.querySelector('h1[data-testid="textArticleTitle"]');
  if (articleHeader) {
    const articleWrapper = document.querySelector('.text .intro-image');
    if (articleWrapper) {
      articleWrapper.insertAdjacentElement('afterend', articleHeader);
    }    
  }
}

document.addEventListener('ShoptetDOMContentLoaded', initArticleMutations);
document.addEventListener('ShoptetPageUpdated', () => {
  isArticleInitialized = false;
  initArticleMutations();
});

if (document.readyState !== 'loading') {
  initArticleMutations();
}