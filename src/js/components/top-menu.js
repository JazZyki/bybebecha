const topNavigation = document.querySelector('.top-navigation-bar');

if (topNavigation) {
    const topNavigationTools = topNavigation.querySelector('.top-navigation-tools');
    const topNavigationToolsPlacer = document.querySelector('#header .navigation-buttons');

    if (topNavigationTools && topNavigationToolsPlacer) {
        topNavigationToolsPlacer.appendChild(topNavigationTools);
    }
}

const mainNavigation = document.querySelector('#navigation');
if (mainNavigation) {
    const mainNavigationPlacer = document.querySelector('#header .site-name-wrapper');
    if (mainNavigationPlacer) {
        mainNavigationPlacer.appendChild(mainNavigation);
    }
}

const footerBannerAromaterapie = document.querySelector('.custom-footer .custom-footer__banner1');
const footerBannerBachovky = document.querySelector('.custom-footer .custom-footer__banner2');
const topMenuLevel2 = document.querySelector('#navigation .menu-level-2[aria-label="Obchod"]');


if (footerBannerAromaterapie && topMenuLevel2) {
    const menuElement = document.createElement('li');
    menuElement.classList.add('menu-item', 'menu-banner');
    menuElement.appendChild(footerBannerAromaterapie);
    topMenuLevel2.appendChild(menuElement);
}

if (footerBannerBachovky && topMenuLevel2) {
    const menuElement = document.createElement('li');
    menuElement.classList.add('menu-item', 'menu-banner');
    menuElement.appendChild(footerBannerBachovky);
    topMenuLevel2.appendChild(menuElement);
}