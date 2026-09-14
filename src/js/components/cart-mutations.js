const isFirstCartStep = document.querySelector('body.in-kosik');

function updateSummaryAlertText() {
    const summaryAlert = document.querySelector('.summary-wrapper .next-step--cart');
    if (summaryAlert) {
        const summaryAlertText = summaryAlert.querySelector('p');
        if (summaryAlertText) {
            summaryAlertText.innerHTML = '<span class="summary-cart-alert-text">Abychom neposílali poloprázdné krabice a zbytečně nezatěžovali životní prostředí (i vaše peněženky vysokým poštovným vůči ceně zboží), nastavili jsme <strong>minimální hodnotu objednávky na 500 Kč.</strong><br />Děkujeme, že s námi nakupujete uvážlivě a šetrně k přírodě! <br />Prosíme, <a href="/obchod/">pokračujte ještě chvíli v nákupu</a>.</span>';
        }
    }
}

function addStorageInfo() {
    const storageInfoPlacer = document.querySelector('#cart-wrapper .cart-inner .cart-row .col-md-8');
    const storageInfo = document.createElement('div');
    storageInfo.classList.add('storage-info');
    storageInfo.innerHTML = '<div class="banner-info-container"><span class="banner-main-text">Všechny objednávky odesíláme do 14 dnů.</span><span class="info-icon">i</span><span class="banner-info-text">Z kapacitních důvodů nemáme všechny nabízené produkty skladem. Věechny objednávky se snažíme zpracovat co nejdříve, nejpozdeji však do čtrnácti dnů. <strong>Děkujeme za pochopení.</strong></span></div>';
    if (storageInfoPlacer) {
        storageInfoPlacer.insertAdjacentElement('beforeend', storageInfo);
    }
}

if (isFirstCartStep) {
    updateSummaryAlertText();
    addStorageInfo();
}

document.addEventListener('ShoptetDOMCartContentLoaded', () => {
    if (isFirstCartStep) {
        updateSummaryAlertText();
        addStorageInfo();
    }
});