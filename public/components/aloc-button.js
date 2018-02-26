const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      text-align: center;
      background: #039be5;
      text-decoration: none;
      color: white;
      padding: 16px;
      border-radius: 4px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
      cursor: pointer;
    }
  </style>
  <slot></slot>
`;

export default class AlocButton extends HTMLElement {
  static get is() {
    return 'aloc-button';
  }

  static get observedAttributes() {
    return ['href'];
  }

  get href() { return this.getAttribute('href') }
  set href(href) {
    var hasHref = Boolean(href);
    if (href) {
      this.setAttribute('href', href);
    } else {
      this.removeAttribute('href');
    }
  }

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.addEventListener('click', this._onClick);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this._onClick);
  }

  _onClick(event) {
    if (this.href) {
      window.location = this.href
    }
  }
}

customElements.define(AlocButton.is, AlocButton);
