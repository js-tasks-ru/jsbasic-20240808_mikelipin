import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;

    this.elem = this.render();       

    this.#onRightArrowClick();
    this.#onLeftArrowClick();

    this.elem.querySelector('.ribbon__inner').addEventListener('click', this.#onSelectCategory);

    return this.elem.innerHTML;
  }

  render() {
    return createElement(`
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
        <nav class="ribbon__inner">
          ${Object.values(this.categories).map(category => {
          return `
            <a href="#" class="ribbon__item${category.id === this.categories[0].id ? ' ribbon__item_active' : ''}" data-id="${category.id}">${category.name}</a>
          `;
          }).join('')}          
        </nav>  
        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button> 
      </div>
    `);
  }

  #onRightArrowClick = () => {
    this.elem.querySelector('.ribbon__arrow_right').onclick = () => {
      const ribbonInner = document.body.querySelector('.ribbon__inner');
      ribbonInner.scrollBy(350, 0);

      if (ribbonInner.scrollWidth - ribbonInner.scrollLeft - ribbonInner.clientWidth === 0) {
        this.elem.querySelector('.ribbon__arrow_right').style.display = 'none';
      } else {
        this.elem.querySelector('.ribbon__arrow_left').style.display = 'flex';
      }
    };
  }

  #onLeftArrowClick = () => {
    this.elem.querySelector('.ribbon__arrow_left').onclick = () => {
      const ribbonInner = document.body.querySelector('.ribbon__inner');
      ribbonInner.scrollBy(-350, 0);

      if (ribbonInner.scrollLeft === 0) {
        this.elem.querySelector('.ribbon__arrow_left').style.display = 'none';
      } else {
        this.elem.querySelector('.ribbon__arrow_right').style.display = 'flex';
      }
    };
  }

  #onSelectCategory = (e) => {
    const target = e.target.closest('.ribbon__item');
    if (target) {
      const prevActive = this.elem.querySelector('.ribbon__item_active');
      if (prevActive) {
        prevActive.classList.remove('ribbon__item_active');
      }
      target.classList.add('ribbon__item_active');
    }
    const category = this.categories.find(category => category.id === target.dataset.id);
    const event = new CustomEvent('ribbon-select', { detail: category.id, bubbles: true });
    this.elem.dispatchEvent(event);
  }
}