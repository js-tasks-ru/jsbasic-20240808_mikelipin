import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.opened = false;

    this.elem = createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon">
            </button>
            <h3 class="modal__title"></h3>
          </div>
          <div class="modal__body">
          </div>
        </div>
      </div>
    `); 

    this.elem.querySelector('.modal__close').addEventListener('click', this.close);

    document.addEventListener('keydown', (event) => {
      if (event.code === 'Escape' && this.opened) {
        this.close();
      }
    });
  } 

  open() {
    if (this.opened) {
      return;
    }       
    
    this.opened = true;
    document.body.classList.add('is-modal-open');
    document.body.append(this.elem);
  } 

  setTitle(title) {
    this.title = title;
    this.elem.querySelector('.modal__title').textContent = title;
  }

  setBody(body) { 
    this.body = body;
    this.elem.querySelector('.modal__body').append(body);
  }
  
  close = (e) => {
    if (!this.opened) {
      return;   
    }

    this.opened = false;
    document.body.classList.remove('is-modal-open');
    document.body.removeChild(this.elem);
  }
}
