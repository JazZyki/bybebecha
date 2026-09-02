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

if (isFirstCartStep) {
    updateSummaryAlertText();
}

document.addEventListener('ShoptetDOMCartContentLoaded', () => {
    if (isFirstCartStep) {
        updateSummaryAlertText();
    }
});