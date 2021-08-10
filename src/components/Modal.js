import $ from "jquery";
import { Modal as BsModal } from "bootstrap";

class Modal extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this._id = $(this).attr("modal-id");
    this._title = $(this).attr("modal-title");
    this._content = $(this).html();
    this.render();
  }

  getModal() {
    return BsModal.getInstance($(`#${this._id}`));
  }

  render() {
    this.innerHTML = `
      <div class="modal fade" id="${this._id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">${this._title}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            ${this._content}
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("bs-modal", Modal);
