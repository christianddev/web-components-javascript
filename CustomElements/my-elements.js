class MyElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: "open"});
  }

  getStyles() {
    return /*html*/ `
      <style>
        .title{
          color: red;
        }
      </style>
    `;
  }
  getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = /*html*/ `
    <section>
      <h2 class="title">Hello word</h2>
      <div>
        <p>other text</p>
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
