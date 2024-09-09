export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;

    this.elem = this.#render(steps, value);

    this.thumb = this.elem.querySelector('.slider__thumb');
    this.progress = this.elem.querySelector('.slider__progress');

    this.progress.style.width = `${(value / (steps - 1)) * 100}%`;
    this.thumb.style.left = `${value / (steps - 1) * 100}%`;

    this.elem.addEventListener('click', this.#onClick);
    this.elem.addEventListener('pointerdown', this.#onPointerDown);

    return this.elem.innerHTML;
  }
  #render(steps, value) {
    const slider = document.createElement('div');
    slider.innerHTML = `
      <div class="slider">
        <div class="slider__thumb">
          <span class="slider__value">${value}</span>
        </div>
        <div class="slider__progress"></div>
        <div class="slider__steps">
        ${[...Array(steps)].map((v, i) => i === value ? '<span class="slider__step-active"></span>' : '<span></span>').join('')}
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

    this.elem.dispatchEvent(new CustomEvent('slider-change', { detail: left }));

    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;
  }

  #onPointerDown = (e) => {
    e.preventDefault();

    let thumbCoords = this.thumb.getBoundingClientRect();
    let sliderCoords = this.elem.getBoundingClientRect();

    let shiftX = e.clientX - thumbCoords.left;

    const mouseMove = (e) => {
      let left = e.clientX - shiftX - sliderCoords.left;
      let leftRelative = left / this.elem.offsetWidth;
      let segments = this.steps - 1;
      let approximateValue = leftRelative * segments;
      let value = Math.min(Math.max(Math.round(approximateValue), 0), segments);
      
      this.progress.style.width = `${value / segments * 100}%`;
      this.thumb.style.left = `${value / segments * 100}%`;
      this.elem.querySelector('.slider__value').textContent = value;
    };

    document.addEventListener('pointermove', mouseMove);

    document.addEventListener('pointerup', () => {
      document.removeEventListener('pointermove', mouseMove);
    });
  }
}
