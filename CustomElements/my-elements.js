class MyElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.subtitle = this.getAttribute("subtitle") ?? "";
    this.otherparagraph = this.getAttribute("otherparagraph") ?? "";
  }

  static get observedAttributes() {
    return ['imageurl', 'imagedescription']
  }

  attributeChangedCallback(attributeName, oldValue, newValue) {
    console.log('attributeName', attributeName)
    console.log('oldValue', oldValue)
    console.log('newValue', newValue)
    if (newValue !== oldValue) {
      this[attributeName] = newValue;
    }

  }



  getStyles() {
    return /*html*/ `
      <style>
        h1,h2{
          color: red;
        }
        .subtitle{
          font-style: italic;
        }
      </style>
    `;
  }
  getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = /*html*/ `
    <section>
    <h1 ><slot name="title"></slot></h1>
    <h2 class="subtitle">${this?.subtitle}</h2>
      <div>
        <p><slot name="paragraph"></slot></p>
        <p>${this?.otherparagraph}</p>
        <img src="${this.imageurl}" alt="${this?.imagedescription}" />
      </div>
    </section>
    ${this.getStyles()}
    `;
    return template;
  }

  render() {
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
  }

  connectedCallback() {
    this.render();
  }
}
customElements.define("my-element", MyElement);
