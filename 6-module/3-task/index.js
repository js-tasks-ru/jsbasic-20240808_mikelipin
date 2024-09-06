import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = Object.assign({}, slides);
    this.elem = this.render();
    this.currenSlide = 0;
    this.elem.querySelector('.carousel__arrow_left').style.display = 'none';    
    this.elem.addEventListener('click', this.#onProductAdd);
    this.elem.querySelector('.carousel__arrow_left').addEventListener('click', this.#onLeftArrowClick);
    this.elem.querySelector('.carousel__arrow_right').addEventListener('click', this.#onRightArrowClick);
    return this.elem.innerHTML;
  }

  render() {
    return createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>

        <div class="carousel__inner">
        ${Object.values(this.slides).map(slide => {
          return `
            <div class="carousel__slide" data-id="${slide.id}">
              <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
              <div class="carousel__caption">
                <span class="carousel__price">€${slide.price.toFixed(2)}</span>
                <div class="carousel__title">${slide.name}</div>
                <button type="button" class="carousel__button">
                  <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                </button>
              </div>
            </div>
          `;
        }).join('')}
        </div>
      </div>
    `);
  };

  #onRightArrowClick = () => {
    const carouselInner = document.body.querySelector('.carousel__inner');
    const carouselArrowRight = document.body.querySelector('.carousel__arrow_right');
    const carouselArrowLeft = document.body.querySelector('.carousel__arrow_left');

    if (this.currenSlide < carouselInner.children.length - 1) {
      this.currenSlide += 1;
      carouselInner.style.transform = `translateX(-${this.currenSlide * 500}px)`;
    }
    if (this.currenSlide === carouselInner.children.length - 1) {
      carouselArrowRight.style.display = 'none';
    }
    if (this.currenSlide > 0) {
      carouselArrowLeft.style.display = 'flex';
    }
    if (this.currenSlide === 0) {
      carouselArrowLeft.style.display = 'none';
    }
  }

  #onLeftArrowClick = () => {
    const carouselInner = document.body.querySelector('.carousel__inner');
    const carouselArrowRight = document.body.querySelector('.carousel__arrow_right');
    const carouselArrowLeft = document.body.querySelector('.carousel__arrow_left');

    if (this.currenSlide > 0) {
      this.currenSlide -= 1;
      carouselInner.style.transform = `translateX(-${this.currenSlide * 500}px)`;
    }
    if (this.currenSlide === 0) {
      carouselArrowLeft.style.display = 'none';
    }
    if (this.currenSlide < carouselInner.children.length - 1) {
      carouselArrowRight.style.display = 'flex';
    }
  }

  #onProductAdd = () => {
    this.elem.dispatchEvent(new CustomEvent('product-add', {
      detail: document.body.querySelector('.carousel__inner').children[this.currenSlide].getAttribute('data-id'),
      bubbles: true
    }));
  };
}
