import hyper from "./../vendor/hyperhtml/esm/index.js";

export default class AlocCard extends HTMLElement {
  static get is() {
    return "aloc-card";
  }

  get actionText() { return this._actionText }
  set actionText(actionText) { this._actionText = actionText; this.render(); }

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowHyper = hyper.bind(this.shadowRoot);
    this._actionText = this.getAttribute("actionText");
  }

  connectedCallback() {
    this.render();
  }

  barClicked() {
    this.dispatchEvent(new CustomEvent("kaelino-card-submit"));
  }

  render() {
    this.shadowHyper`
      ${this._styles()}
      <div class="container">
        <slot></slot>
      </div>
      ${this.actionText ? hyper`
        <div class="bar" onclick=${() => this.barClicked()}>
          ${this.actionText}
        </div>` : ""}
    `
  }

  _styles() {
    return hyper`<style>
      :host {
        display: block;
        background: white;
        border-radius: 3px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        position: relative;
        padding-bottom: 3rem;
      }

      .container {
        padding: 24px;
      }

      .bar {
        position: absolute;
        bottom: 0;
        height: 3rem;
        width: 100%;
        color: white;
        padding: 1rem;
        box-sizing: border-box;
        text-align: center;
        background: #039be5;
        transition: background-color 0.3s;
        border-radius: 0 0 3px 3px;
        cursor: pointer;
      }

      .bar:hover {
        background-color: #097fb9;
      }
    </style>`;
  }
}

customElements.define(AlocCard.is, AlocCard);
