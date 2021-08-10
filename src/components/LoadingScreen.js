class LoadingScreen extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <div id="loadingScreen" class="loading-screen">
      <div class="inner">
        <div class="spinner-border text-white mb-3" style="width: 3.5rem; height: 3.5rem;" role="status">
        </div>
        <p>Loading</p>
      </div>
    </div>
    `;
  }
}

customElements.define("loading-screen", LoadingScreen);
