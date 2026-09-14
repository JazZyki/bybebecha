const isBannerVisible = document.querySelector('.custom-footer__banner4')

if (isBannerVisible) {
    const bannerMainText = isBannerVisible.querySelector('.main-banner-textation').innerHTML
    const bannerInfoText = isBannerVisible.querySelector('.hover-textation-view').innerHTML

    const infoPlacement = document.querySelector('.top-navigation-contacts')

    const infoElement = document.createElement('span')
    infoElement.innerHTML = '  |  <div class="banner-info-container">' + '<span class="banner-main-text">' + bannerMainText + '</span>' + '<span class="info-icon">i</span>' + '<span class="banner-info-text">' + bannerInfoText + '</span>' + '</div>'
    infoPlacement.insertAdjacentElement('beforeend', infoElement)
}