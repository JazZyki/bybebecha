document.addEventListener('DOMContentLoaded', function () {
    var STORAGE_KEY = 'constructionNoticeCount';
    var MAX_SHOWS = 5;

    var shownCount = parseInt(localStorage.getItem(STORAGE_KEY), 10);
    if (isNaN(shownCount)) {
        shownCount = 0;
    }

    if (shownCount >= MAX_SHOWS) {
        return;
    }

    shownCount++;
    localStorage.setItem(STORAGE_KEY, shownCount);

    var overlay = document.createElement('div');
    overlay.id = 'construction-modal-overlay';
    overlay.style.cssText = [
        'position: fixed',
        'top: 0',
        'left: 0',
        'width: 100%',
        'height: 100%',
        'background: rgba(0, 0, 0, 0.6)',
        'display: flex',
        'align-items: center',
        'justify-content: center',
        'z-index: 9999'
    ].join(';');

    var modal = document.createElement('div');
    modal.style.cssText = [
        'background: #fff',
        'max-width: 420px',
        'width: 90%',
        'padding: 24px',
        'border-radius: 8px',
        'box-shadow: 0 8px 24px rgba(0,0,0,0.25)',
        'font-family: Arial, sans-serif',
        'text-align: center'
    ].join(';');

    modal.innerHTML =
        '<h2 style="margin-top:0;">E-shop je ve výstavbě</h2>' +
        '<p>Náš e-shop je momentálně ve výstavbě. Prosíme, nenakupujte zatím žádné produkty, ' +
        'transakce nemusí být zpracovány správně.</p>' +
        '<button id="construction-modal-close" style="' +
        'margin-top: 16px;' +
        'padding: 10px 20px;' +
        'background: #333;' +
        'color: #fff;' +
        'border: none;' +
        'border-radius: 4px;' +
        'cursor: pointer;' +
        'font-size: 14px;' +
        '">Rozumím</button>';

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    function closeModal() {
        if (overlay.parentNode) {
            overlay.parentNode.removeChild(overlay);
        }
        document.removeEventListener('keydown', onKeyDown);
    }

    function onKeyDown(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    }

    document.getElementById('construction-modal-close').addEventListener('click', closeModal);
    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) {
            closeModal();
        }
    });
    document.addEventListener('keydown', onKeyDown);
});
