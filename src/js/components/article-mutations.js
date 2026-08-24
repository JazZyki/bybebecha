let isArticleInitialized = false;

async function fetchProductData(url) {
  const cacheKey = `bebecha_product_cache_${url}`;
  const cached = sessionStorage.getItem(cacheKey);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {}
  }

  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const htmlText = await res.text();
    const doc = new DOMParser().parseFromString(htmlText, 'text/html');

    // Název produktu
    const title =
      doc.querySelector('h1[itemprop="name"]')?.textContent?.trim() ||
      doc.querySelector('.p-detail-inner h1')?.textContent?.trim() ||
      doc.querySelector('.product-top h1')?.textContent?.trim() ||
      doc.querySelector('h1')?.textContent?.trim() ||
      doc.querySelector('meta[property="og:title"]')?.getAttribute('content') ||
      '';

    // Hlavní obrázek produktu
    let image =
      doc.querySelector('.p-main-image img')?.getAttribute('src') ||
      doc.querySelector('.p-main-image img')?.getAttribute('data-src') ||
      doc.querySelector('.p-main-image img')?.getAttribute('data-original') ||
      doc.querySelector('meta[property="og:image"]')?.getAttribute('content') ||
      '';

    if (image && !image.startsWith('http') && !image.startsWith('//')) {
      image = new URL(image, window.location.origin).href;
    }

    // Cena produktu
    const price =
      doc.querySelector('.price-final-holder')?.textContent?.trim() ||
      doc.querySelector('.price-standard')?.textContent?.trim() ||
      doc.querySelector('.price-save')?.textContent?.trim() ||
      doc.querySelector('[itemprop="price"]')?.textContent?.trim() ||
      '';

    if (!title && !image) return null;

    const data = { title, image, price, url };
    sessionStorage.setItem(cacheKey, JSON.stringify(data));
    return data;
  } catch (err) {
    console.error('Chyba při načítání produktu z článku:', url, err);
    return null;
  }
}

async function renderArticleProductsWidget(articleContent) {
  if (document.querySelector('.article-products-widget')) return;

  const links = Array.from(articleContent.querySelectorAll('a[href]'));
  const productUrls = new Set();

  links.forEach((a) => {
    const href = a.getAttribute('href');
    if (!href) return;

    // Filtrujeme kotvy, javascript, e-maily a soubory
    if (
      href.startsWith('#') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('javascript:') ||
      href.includes('/blog') ||
      href.includes('/clanky') ||
      href.includes('/user/documents') ||
      href.includes('/kosik') ||
      href.includes('/objednavka') ||
      href.includes('/login') ||
      href.includes('/obchodni-podminky') ||
      href.match(/\.(jpg|jpeg|png|gif|webp|svg|pdf|zip)$/i)
    ) {
      return;
    }

    // Ponecháme pouze interní odkazy (relativní nebo se stejnou doménou)
    try {
      const parsedUrl = new URL(href, window.location.origin);
      if (parsedUrl.origin === window.location.origin && parsedUrl.pathname !== window.location.pathname) {
        productUrls.add(parsedUrl.pathname);
      }
    } catch (e) {}
  });

  if (productUrls.size === 0) return;

  const products = (
    await Promise.all(Array.from(productUrls).map(fetchProductData))
  ).filter(Boolean);

  if (products.length === 0) return;

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

  const sidebar = document.querySelector('aside.sidebar .sidebar-inner');
  const isSidebarVisible =
    sidebar &&
    window.innerWidth > 768 &&
    window.getComputedStyle(sidebar).display !== 'none';

  if (isSidebarVisible) {
    sidebar.insertAdjacentElement('afterbegin', widget);
  } else {
    // Mobilní zobrazení nebo chybějící sidebar: vložíme po 10. odstavci, případně na konec článku
    const paragraphs = Array.from(articleContent.querySelectorAll('p')).filter(
      (p) => !p.closest('.our-tip') && !p.closest('.article-products-widget')
    );

    if (paragraphs.length >= 10) {
      paragraphs[9].insertAdjacentElement('afterend', widget);
    } else {
      articleContent.insertAdjacentElement('beforeend', widget);
    }
  }
}

function initArticleMutations() {
  const articleContent = document.querySelector('.text');
  
  if (articleContent) {
    renderArticleProductsWidget(articleContent);
  }

  const topPtoductsTitle = document.querySelector('.box-topProducts .pageElement__heading');
  if (topPtoductsTitle) {
    topPtoductsTitle.innerHTML = '<strong>Top 10</strong> produktů';
  }
}

document.addEventListener('ShoptetDOMContentLoaded', initArticleMutations);

if (document.readyState !== 'loading') {
  initArticleMutations();
}