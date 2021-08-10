import $ from "jquery";
import { nanoid } from "nanoid";
import ApiProvider from "../providers/ApiProvider";
import AuthProvider from "../providers/AuthProvider";
import { loginService } from "../services/AuthService";
import { Modal } from "bootstrap";

class LoginModal extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this._modalId = "loginForm";
    this._formId = `form-${nanoid(8)}`;
    this.render();
  }

  getModal() {
    return Modal.getInstance($(`#${this._modalId}`));
  }

  async onSubmitLogin() {
    const username = $(this).find("input[name=username]").val();
    const password = $(this).find("input[name=password]").val();
    if (!username || !password) return alert("Please input required fields");
    try {
      const { token, data: user } = await loginService(
        ApiProvider(),
        username,
        password
      );
      AuthProvider.login(user, token);
      this.getModal().hide();
    } catch (error) {
      console.log(error);
      alert("Login failed");
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
          <div>
            <label for="${this._formId}-login-password">Password</label>
            <input id="${this._formId}-login-password" type="password" class="form-control" name="password" required />
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
      <bs-modal modal-id="${this._modalId}" modal-title="Login Form">
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
        this.onSubmitLogin();
      });
  }
}

customElements.define("login-modal", LoginModal);
