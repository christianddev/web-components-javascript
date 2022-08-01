class MyCustomElement extends HTMLElement {
  constructor(){
    super()
    console.log('CustomElement - constructor - From memory')
  }
  connectedCallback(){
    console.log('CustomElement - connectedCallback - From DOM')
  }
  disconnectedCallback(){
    console.log('CustomElement - disconnectedCallback - Bye DOM')
  }

}

customElements.define('my-custom-element', MyCustomElement);
document.querySelector('my-custom-element').remove();