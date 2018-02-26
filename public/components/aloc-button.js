const template = document.createElement('template');
template.innerHTML = `
  <link href="/components/shared.css" rel="stylesheet">
  <style>
    :host {
      text-align: center;
      display: block;
      background: var(--primary-color);
      border-radius: var(--border-radius);
      box-shadow: var(--box-shadow);
      color: var(--font-color);
      padding: var(--standard-padding);
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
