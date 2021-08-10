import $ from "jquery";

class Layout extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    $(this).attr("id", "root");
    this._content = $(this).html();
    this.render();
  }

  render() {
    this.innerHTML = `
      <app-header></app-header>
      <main>
        ${this._content}
      </main>
      <footer>
        <div class="footer-inner d-flex justify-content-center">
          <div>
            Matthew Christopher Albert @ ${new Date().getFullYear()}
          </div>
        </div>
      </footer>
      <loading-screen></loading-screen>
      <login-modal></login-modal>
      <register-modal></register-modal>
    `;
  }
}

customElements.define("app-layout", Layout);
