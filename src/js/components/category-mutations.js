function applyCategoryClasses() {
  const isCategoryPage = document.body.classList.contains('type-category');
  const isHomePage = document.body.classList.contains('in-index');

  if (!isCategoryPage && !isHomePage) return;

  const selector = isHomePage ? '#products-2 .product' : '#products .product';
  const allProducts = document.querySelectorAll(selector);

  allProducts.forEach((item) => {
    const skuElem = item.querySelector('[data-micro="sku"]');
    if (!skuElem) return;

    const sku = skuElem.innerText.trim();
    const productCategory = sku.split('-')[0];

    switch (productCategory) {
      case 'ARO':
        item.classList.add('aroma');
        break;
      case 'DET':
        item.classList.add('deti');
        break;
      case 'DAR':
        item.classList.add('darek');
        break;
      default:
        break;
    }
  });
}

// 1. Spuštění po základním načtení DOMu Shoptetu
document.addEventListener('ShoptetDOMContentLoaded', applyCategoryClasses);

// 2. Spuštění při dynamickém filtrování a stránkování (AJAX)
document.addEventListener('ShoptetPageUpdated', applyCategoryClasses);
document.addEventListener('ShoptetPagePaginationDone', applyCategoryClasses);

// 3. Fallback pokud DOM již byl připraven v době načtení skriptu
if (document.readyState !== 'loading') {
  applyCategoryClasses();
}

const isImunitaKat = document.querySelector('.subcategories li a[href="/imunita/"]');
const isCategoryPage = document.body.classList.contains('type-category');
if (isImunitaKat && isCategoryPage) {
  const imunitaParent = isImunitaKat.closest('li');
  if (imunitaParent) {
    imunitaParent.classList.add('menu-item--hidden');
  }
}

const isAroKonzultaceKat = document.querySelector('.subcategories li a[href="/aromaterapeuticke-konzultace-2/"]');
const isCategoryPage2 = document.body.classList.contains('type-category') && document.body.classList.contains('in-aromaterapie');
if (isAroKonzultaceKat && isCategoryPage2) {
  isAroKonzultaceKat.setAttribute('href', '/aromaterapeuticke-konzultace/');
}