const isProductDetailPage = document.querySelector('.type-detail')

if (isProductDetailPage) {
    const productDetailHeader = isProductDetailPage.querySelector('.p-detail-inner-header').innerHTML
    const productInfoWrapper = isProductDetailPage.querySelector('.p-info-wrapper')
    const productVendor = isProductDetailPage.querySelector('.p-detail-info').innerHTML

    const SKU = isProductDetailPage.querySelector('.p-code span:nth-child(2)').textContent.trim()
    const SKUSplit = SKU.split("-")
    const productDetailCategory = SKUSplit[0]

    switch(productDetailCategory) {
      case "ARO":
        isProductDetailPage.classList.add('aroma');
        break;
      case "DET":
        isProductDetailPage.classList.add('deti');
        break;
      case "DAR":
        isProductDetailPage.classList.add('darek');
        break;
      default:
        break;
    } 

    productInfoWrapper.insertAdjacentHTML("afterbegin", productVendor)
    productInfoWrapper.insertAdjacentHTML("afterbegin", productDetailHeader)

    const infoTabItems = isProductDetailPage.querySelectorAll('.basic-description .tab-item')
    if (infoTabItems.length) {
      infoTabItems.forEach((item) => {
        item.classList.add('closed')
        const tabTitle = item.querySelector('h2')
        tabTitle.addEventListener('click', () => {
          item.classList.toggle('closed')
        })
      })
    }

    const ourTipDiv = isProductDetailPage.querySelector('.basic-description .our-tip')
    if (ourTipDiv) {
      const ourTipPlaceholder = isProductDetailPage.querySelector('.extended-description')
      ourTipPlaceholder.insertAdjacentElement("beforeend", ourTipDiv)
    }
}
