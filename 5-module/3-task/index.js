function initCarousel() {

  const carouselWrapper = document.querySelector('[data-carousel-holder]');
  const carouselInner = carouselWrapper.querySelector('.carousel__inner');
  const carouselArrowRight = carouselWrapper.querySelector('.carousel__arrow_right');
  const carouselArrowLeft = carouselWrapper.querySelector('.carousel__arrow_left');

  let currentSlide = 0;
  
  carouselArrowRight.addEventListener('click', () => {
    if (currentSlide < carouselInner.children.length - 1) {
      currentSlide += 1;
      carouselInner.style.transform = `translateX(-${currentSlide * 500}px)`;
    }
    if (currentSlide === carouselInner.children.length - 1) {
      carouselArrowRight.style.display = 'none';
    }
    if (currentSlide !== 0) {
      carouselArrowLeft.style.display = '';
    }
  });

  carouselArrowLeft.addEventListener('click', () => {
    if (currentSlide > 0) {
      currentSlide -= 1;
      carouselInner.style.transform = `translateX(-${currentSlide * 500}px)`;
    }
    if (currentSlide === 0) {
      carouselArrowLeft.style.display = 'none';
    }
    if (currentSlide !== carouselInner.children.length - 1) {
      carouselArrowRight.style.display = '';
    }
  });
  
  carouselArrowLeft.style.display = 'none';
}
