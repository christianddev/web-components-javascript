class ProductCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["img", "alt", "title", "description", "price"];
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
        --primary-background: indianred;
          width: 80%;
          max-width: 900px;
          min-width: 280px;
          margin: 0 auto;
      }
      .container {
          position: relative;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          width: 900px;
          height: 600px;
          margin: 20px;
          background-color: #fff;
      }
      .container .imgBox {
          position: relative;
          display: flex;
          justify-content: center;
          width: 50%;
          height: 100%;
          background-color: var(--primary-background)
      }
      .container .imgBox:before {
          position: absolute;
          top: 20px;
          left: 20px;
          font-size: 8em;
          font-weight: 800;
          color: papayawhip;
          content: 'Lolita';
          opacity: 0.1;
      }
      .container .imgBox img {
          position: relative;
          top: 100px;
          left: -50px;
          width: 720px;
          height: 480px;
          transform: rotate(-30deg);
      }
      .container .details {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 50%;
          height: 100%;
          box-sizing: border-box;
          padding: 40px;

      }
      .container .details h2 {
          margin-bottom: 25px;
          font-size: 2.5em;
          line-height: 0.8em;
          color: #444;
      }

      .container .details p {
          max-width: 85%;
          margin-left: 15%;
          margin-bottom: 35px;
          color: #333;
          font-size: 15px;
      }
      .container .details h3 {
          float: left;
          font-size: 2.5em;
          color: #a2a2a2;
      }
      .container .details button {
          margin-top: 35px;
          float: right;
          padding: 15px 20px;
          font-size: 16px;
          color: #fff;
          letter-spacing: 1px;
          font-weight: 600;
          text-transform: uppercase;
          border-radius: 40px;
          background-color: var(--primary-background);
          border-color: var(--primary-background);
          cursor: pointer;
      }
      @media (max-width: 1080px) {
          .container {
              height: auto;
              width: auto;
          }
          .container .imgBox {
              padding: 40px;
              width: 100%;
              box-sizing: border-box;
              height: auto;
              text-align: center;
          }
          .container .imgBox img {
              left: initial;
              width: 100%;
              height: auto;
              transform: rotate(0deg);
          }

          .container .details {
              width: 100%;
              height: auto;
              padding: 20px;
          }

          .container .details p {
              max-width: 100%;
              margin-left: 0;
          }
      }
    </style>
    `;
  }

  getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = /*html*/ `
    <main class="container">
      <section class="imgBox">
      <img src="${this.img ?? ""}" alt="${this.alt ?? ""}" />
      </section>
      <section class="details">
      <div class="content">
        <h2>${this.title ?? ""}</h2>
        <p>${this.description ?? ""}</p>
        <h3>€${this.price ?? ""}</h3>
        <button>Buy</button>
        </div>
      </section>
    </main>
    ${this.getStyles()}`;
    return template;
  }

  render() {
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define("product-card", ProductCard);
