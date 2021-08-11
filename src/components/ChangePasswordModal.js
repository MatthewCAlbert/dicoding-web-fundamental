import $ from "jquery";
import { nanoid } from "nanoid";
import ApiProvider from "../providers/ApiProvider";
import AuthProvider from "../providers/AuthProvider";
import { changePasswordService } from "../services/AuthService";
import { Modal } from "bootstrap";
import { setLoading, toast } from "../utils/utils";

class ChangePasswordModal extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this._modalId = "changePasswordForm";
    this._formId = `form-${nanoid(8)}`;
    this.render();
  }

  getModal() {
    return Modal.getInstance($(`#${this._modalId}`));
  }

  async onSubmitChange() {
    const oldPassword = $(this).find("input[name=old-password]").val();
    const newPassword = $(this).find("input[name=new-password]").val();
    const rePassword = $(this).find("input[name=re-password]").val();
    if (!oldPassword || !newPassword || !rePassword)
      return toast.warning("Please input required fields");
    if (rePassword !== newPassword)
      return toast.warning("New password doesn't match");
    if (oldPassword === newPassword)
      return toast.warning("No password change found");
    setLoading(true);
    try {
      const { token, data: user } = await changePasswordService(
        ApiProvider(),
        oldPassword,
        newPassword
      );
      AuthProvider.login(user, token);
      toast.success("Change Password Success");
      this.getModal().hide();
      window.location.reload();
    } catch (error) {
      toast.error("Change Password Failed");
    }
    setLoading(false);
  }

  modalContent() {
    return `
      <div class="modal-body">
        <form id="${this._formId}">
          <div class="mb-3">
            <label for="${this._formId}-cp-old">Old Password</label>
            <input id="${this._formId}-cp-old" type="password" class="form-control" name="old-password" required />
          </div>
          <div class="mb-3">
            <label for="${this._formId}-cp-new">New Password</label>
            <input id="${this._formId}-cp-new" type="password" class="form-control" name="new-password" required />
          </div>
          <div>
            <label for="${this._formId}-cp-re">Retype New Password</label>
            <input id="${this._formId}-cp-re" type="password" class="form-control" name="re-password" required />
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" id="submitChangeButton">Submit</button>
      </div>
    `;
  }

  render() {
    this.innerHTML = `
      <bs-modal modal-id="${this._modalId}" modal-title="Change Password">
        ${this.modalContent()}
      </bs-modal>
    `;

    $(this)
      .find("form")
      .on("submit", (e) => {
        e.preventDefault();
      });

    $(this)
      .find("#submitChangeButton")
      .on("click", () => {
        this.onSubmitChange();
      });
  }
}

customElements.define("changepassword-modal", ChangePasswordModal);
