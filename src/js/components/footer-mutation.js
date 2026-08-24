const footer = document.getElementById('footer');
if (footer) {
    const logo = footer.querySelector('.site-name a');
    if (logo) {
        logo.innerHTML = '';
        const img = document.createElement('img');
        img.src = '/user/documents/upload/bybebecha-logo-white.svg';
        img.alt = 'Bebecha';
        logo.appendChild(img);
    }

    const signature = footer.querySelector('#signature');
    if (signature) {
        const mySignature = document.createElement('div');
        mySignature.className = 'my-signature';
        mySignature.innerHTML = `
            | Design&kódování: <a href="https://www.jazzyki.cz/" target="_blank" rel="noopener noreferrer">Jakub Zykl</a>
        `;
        signature.appendChild(mySignature);
    }
}