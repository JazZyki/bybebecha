const isCategoryPage = document.querySelector(".type-category")
const isHomePage = document.querySelector(".in-index")
if(isCategoryPage) {
 const allProducts = document.querySelectorAll("#products .product");
  allProducts.forEach(item => {
 		const SKU = item.querySelector('[data-micro="sku"]').innerText;
    const SKUSplit = SKU.split("-")
    const productCategory = SKUSplit[0]
    switch(productCategory) {
      case "ARO":
        item.classList.add('aroma');
        break;
      case "DET":
        item.classList.add('deti');
        break;
      case "DAR":
        item.classList.add('darek');
        break;
      default:
        break;
    } 
 })
}

if(isHomePage) {
 const allProducts = document.querySelectorAll("#products-2 .product");
  allProducts.forEach(item => {
 		const SKU = item.querySelector('[data-micro="sku"]').innerText;
    const SKUSplit = SKU.split("-")
    const productCategory = SKUSplit[0]
    switch(productCategory) {
      case "ARO":
        item.classList.add('aroma');
        break;
      case "DET":
        item.classList.add('deti');
        break;
      case "DAR":
        item.classList.add('darek');
        break;
      default:
        break;
    } 
 })
}