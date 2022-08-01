class MyElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.subtitle = this.getAttribute("subtitle") ?? "";
    this.otherparagraph = this.getAttribute("otherparagraph") ?? "";
  }

  static get observedAttributes() {
    return ["imageurl", "imagedescription"];
  }

  attributeChangedCallback(attributeName, oldValue, newValue) {
    if (newValue !== oldValue) {
      this[attributeName] = newValue;
    }
  }

  getStyles() {
    return /*html*/ `
      <style>
        :host {
          --primary-color: tomato;
          --secondary-color: orange;
          --heading-primary: 50px;
          --heading-secondary: 30px;
          display: inline-block;
          width: 100%;
          min-width: 300px;
          max-width: 600px;
          font-style: italic;
          padding: 10px;
        }
        :host(.text-align-right) {
          text-align: right;
        }
        :host([cyan]) {
          background-color: cyan;
        }
        :host-context(.text-align-right)  h2{
          color: red;
        }
        :host-context(article.card) {
          display: block;
          max-width: 100%;
          background-color: gray;
        }
        ::slotted(.color-green) {
          color: green;
        }
        section {
          background-color: var(--primary-color);
        }
        section div {
          background-color: var(--secondary-color);
        }
        h1 {
          font-size: var(--heading-primary);
        }
        p {
          font-size: var(--heading-secondary);
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
        <img src="${this.imageurl ?? ''}" alt="${this?.imagedescription ?? ''}" />
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
