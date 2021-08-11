import { setTitle } from "../utils/utils";
import AuthProvider from "../providers/AuthProvider";

class IndexPage {
  constructor() {
    this._user = AuthProvider.getUserData();
  }

  render() {
    setTitle();
    if (this._user)
      return `
        <section class="section section-normalized">
          <div class="section-inner">
            <note-list/>
          </div>
        </section>
      `;
    else
      return `
        <section class="section section-normalized">
          <div class="section-inner d-flex flex-column align-items-center mt-4">
            <h1>Welcome to The Notes</h1>
            <p>It seems you haven't logged in yet.</p>
            <a class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#loginForm">Login</a>
            <span class="d-block">or</span>
            <a class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#registerForm">Register</a>
          </div>
        </section>
      `;
  }
}

export default IndexPage;
