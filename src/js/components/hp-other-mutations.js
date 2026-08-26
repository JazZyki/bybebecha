const selectedProductsSectionTitle = document.querySelector('.homepage-products-heading-2');

if (selectedProductsSectionTitle) {
    const selectedProductSectionHTML = `
        <div class="product-section-title">
            <h2 class="products-section-heading-2">Sady pro klidný start</h2>
            <p>Speciálně sestavené balíčky v dárkovém balení pro nejdůležitější fáze mateřství a vývoje dítěte.</p> 
        </div>
        <div class="products-section-link">
            <a href="/darkove-balicky-2/" class="btn btn-secondary has-arrow">Všechny balíčky</a>
        </div>
    `;

    selectedProductsSectionTitle.innerHTML = selectedProductSectionHTML;

    const selectedProductsSection = selectedProductsSectionTitle.closest('.content-wrapper ');
    selectedProductsSection.classList.add('selected-products-section');
}

const eshopHeader = document.querySelector('.welcome-wrapper .h1');
if (eshopHeader) {
    const eshopHeaderHTML = eshopHeader.innerHTML.replace('bybebecha.cz', '<strong>bybebecha.cz</strong>');
    eshopHeader.innerHTML = eshopHeaderHTML;
}

const isBlogWrapper = document.querySelector('.homepage-blog-wrapper');
if (isBlogWrapper) {
    const blogSectionTitle = isBlogWrapper.querySelector('.homepage-group-title.h4');
    blogSectionTitle.innerHTML = '<div>Nejnovější články <strong>z blogu</strong></div>';

    const blogSectionLink = document.createElement('div');
    blogSectionLink.classList.add('products-section-link');
    blogSectionLink.innerHTML = '<a href="/blog" class="btn btn-secondary has-arrow">Všechny články</a>';

    isBlogWrapper.appendChild(blogSectionLink);
}