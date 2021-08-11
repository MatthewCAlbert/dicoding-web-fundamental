import { dayJsWrapped, setTitle } from "../utils/utils";
import ProtectedPage from "./ProtectedPage";

class AccountPage extends ProtectedPage {
  constructor() {
    super();
  }

  render() {
    if (!this._user) return;
    setTitle("Account");
    return `
      <section class="section section-normalized">
        <div class="section-inner">
          <h1>Welcome, ${this._user.username}</h1>
          <p>Account created at: ${dayJsWrapped(this._user.createdAt).format(
            "D MMM YYYY H:mm"
          )}</p>
          <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#changePasswordForm">Change Password</button>
        </div>
      </section>
      <changepassword-modal/>
    `;
  }
}

export default AccountPage;
