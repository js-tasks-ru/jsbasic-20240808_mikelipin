export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;

    this.elem = this.#render();
    this.elem.addEventListener('click', this.#onClick, { bubbles: true });

    this.thumb = this.elem.querySelector('.slider__thumb');   
    this.thumb.ondragstart = () => false;
    this.thumb.style.left = `${value / (steps - 1) * 100}%`;       
    this.thumb.addEventListener('pointerdown', this.#onPointerDown);
    this.thumb.addEventListener('pointerup', this.#onPointerUp); 

    this.progress = this.elem.querySelector('.slider__progress');
    this.progress.style.width = `${(value / (steps - 1)) * 100}%`;     

    return this.elem.innerHTML;
  }
  #render() {
    const slider = document.createElement('div');
    slider.innerHTML = `
      <div class="slider">
        <div class="slider__thumb">
          <span class="slider__value">${this.value}</span>
        </div>
        <div class="slider__progress"></div>
        <div class="slider__steps">
        ${[...Array(this.steps)].map((v, i) => i === this.value ? '<span class="slider__step-active"></span>' : '<span></span>').join('')}
        </div>
      </div>
    `;
    return slider.firstElementChild;
  }

  #onClick = (e) => {
    const thumb = this.elem.querySelector('.slider__thumb');
    const progress = this.elem.querySelector('.slider__progress');

    let left = Math.round((e.clientX - this.elem.getBoundingClientRect().left) / this.elem.getBoundingClientRect().width * (this.elem.querySelector('.slider__steps').children.length - 1));
    let leftPercents = left / (this.elem.querySelector('.slider__steps').children.length - 1) * 100;
    
    this.elem.querySelector('.slider__value').textContent = left;
    this.elem.dispatchEvent(new CustomEvent('slider-change', { bubbles: true, detail: left }));

    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;
  }

  #onPointerDown = (e) => {
    e.preventDefault();
    this.elem.classList.add('slider_dragging');
    this.elem.addEventListener('pointermove', this.#onPointerMove, { bubbles: true });
  }

  #onPointerMove = (e) => {
    e.preventDefault();
    let left = e.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;

    if (leftRelative < 0) {
      leftRelative = 0;
    }

    if (leftRelative > 1) {
      leftRelative = 1;
    }

    let leftPercents = leftRelative * 100;
    this.thumb.style.left = `${leftPercents}%`;
    this.progress.style.width = `${leftPercents}%`;

    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;

    this.value = Math.round(approximateValue);
    this.elem.querySelector('.slider__value').textContent = this.value;

    const steps = this.elem.querySelectorAll('.slider__steps > span');
    steps.forEach(span => span.classList.remove('slider__step-active'));
    steps[this.value].classList.add('slider__step-active');       
  }

  #onPointerUp = (e) => {
    e.preventDefault();
    this.elem.classList.remove('slider_dragging');
    this.elem.removeEventListener('click', this.#onClick, { bubbles: true });
    this.elem.removeEventListener('pointermove', this.#onPointerMove, { bubbles: true });
    this.elem.removeEventListener('pointerup', this.#onPointerUp, { bubbles: true });
    this.elem.dispatchEvent(new CustomEvent('slider-change', { bubbles: true, detail: this.value }));
  }
}
