import { Modal } from "bootstrap";
import $ from "jquery";
import { nanoid } from "nanoid";
import ApiProvider from "../providers/ApiProvider";
import AuthProvider from "../providers/AuthProvider";
import { registerService } from "../services/AuthService";

class RegisterModal extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this._formId = `form-${nanoid(8)}`;
    this.render();
  }

  getModal() {
    return Modal.getInstance($(`#${this._modalId}`));
  }

  async onSubmitRegister() {
    const username = $(this).find("input[name=username]").val();
    const password = $(this).find("input[name=new-password]").val();
    const rePassword = $(this).find("input[name=re-password]").val();
    if (!username || !password || !rePassword)
      return alert("Please input required fields");
    if (password !== rePassword) return alert("New password doesn't match");
    try {
      const { token, data: user } = await registerService(
        ApiProvider(),
        username,
        password
      );
      AuthProvider.login(user, token);
    } catch (error) {
      alert("Register failed");
    }
  }

  modalContent() {
    return `
      <div class="modal-body">
        <form id="${this._formId}">
          <div class="mb-3">
            <label for="${this._formId}-login-username">Username</label>
            <input id="${this._formId}-login-username" type="text" class="form-control" name="username" required />
          </div>
          <div class="mb-3">
            <label for="${this._formId}-new-password">New Password</label>
            <input id="${this._formId}-new-password" type="password" class="form-control" name="new-password" required />
          </div>
          <div>
            <label for="${this._formId}-re-password">Retype New Password</label>
            <input id="${this._formId}-re-password" type="password" class="form-control" name="re-password" required />
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" id="submitLoginButton">Login</button>
      </div>
    `;
  }

  render() {
    this.innerHTML = `
      <bs-modal modal-id="registerForm" modal-title="Register Form">
        ${this.modalContent()}
      </bs-modal>
    `;

    $(this)
      .find("form")
      .on("submit", (e) => {
        e.preventDefault();
      });

    $(this)
      .find("#submitLoginButton")
      .on("click", () => {
        this.onSubmitRegister();
      });
  }
}

customElements.define("register-modal", RegisterModal);
