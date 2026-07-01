const isCarousel = document.querySelector('.homepage-box.before-carousel');
/*if (isCarousel) {
    const carouselSlides = isCarousel.querySelectorAll('.carousel-inner .item');
    carouselSlides.forEach((slide, index) => {
        const sliderAnchor = slide.querySelector('a');
        const slideHref = sliderAnchor.getAttribute('href');
        const slideImage = slide.querySelector('img');
        const slideImageSrc = slideImage.getAttribute('src');
        const slideImageAlt = slideImage.getAttribute('alt');
        const slideTexts = slide.querySelector('.extended-banner-texts');
        const slideLinkText = slideTexts.querySelector('.extended-banner-link').textContent;

        // Create a new anchor element for the slide
        const newAnchor = document.createElement('a');
        newAnchor.setAttribute('href', slideHref);
        newAnchor.classList.add('carousel-slide-link');
        newAnchor.textContent = slideLinkText;
        slideTexts.insertAdjacentElement('beforeend', newAnchor);

        const newImageWrapper = document.createElement('div');
        newImageWrapper.classList.add('carousel-slide-image-wrapper');
        const newImage = document.createElement('img');
        newImage.setAttribute('src', slideImageSrc);
        newImage.setAttribute('alt', slideImageAlt);
        newImageWrapper.appendChild(newImage);

        slide.insertAdjacentElement('afterbegin', newImageWrapper);
        slide.insertAdjacentElement('afterbegin', slideTexts);
        sliderAnchor.remove();
    });
}*/