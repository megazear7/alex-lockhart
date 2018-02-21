export default class AlocImg extends HTMLElement {
  static get is() {
    return "aloc-img";
  }

  get src() { return this._src }
  set src(src) { this._src = src; this.updateImage(); }

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this._src = this.getAttribute("src");

    this.updateImage();
  }

  updateImage() {
    var img = document.createElement("img");
    img.src = this.src;
    img.style.opacity = "0";
    img.style.borderRadius = "3px";
    img.style.transition = "opacity 1s";
    img.style.width = "100%";
    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(img);

    img.addEventListener("load", () => {
      img.style.opacity = "1";
    });
  }
}

customElements.define(AlocImg.is, AlocImg);
