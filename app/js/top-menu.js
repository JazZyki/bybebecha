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