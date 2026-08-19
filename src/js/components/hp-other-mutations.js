const selectedProductsSectionTitle = document.querySelector('.homepage-products-heading-2');

if (selectedProductsSectionTitle) {
    const selectedProductSectionHTML = `
        <div class="product-section-title">
            <h2 class="products-section-heading-2">Sady pro klidný start</h2>
            <p>Speciálně sestavené balíčky v dárkovém balení pro nejdůležitější fáze mateřství a vývoje dítěte.</p> 
        </div>
        <div class="products-section-link">
            <a href="/collections/sady-pro-klidny-start" class="btn btn-secondary has-arrow">Všechny balíčky</a>
        </div>
    `;

    selectedProductsSectionTitle.innerHTML = selectedProductSectionHTML;
}