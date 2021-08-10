import $ from "jquery";
import { nanoid } from "nanoid";
import AuthProvider from "../providers/AuthProvider";

class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this._navTogglerId = `btn-${nanoid(8)}`;
    this._logoutBtnId = `btn-${nanoid(8)}`;
    this._menuId = `menu-${nanoid(8)}`;
    this._userData = AuthProvider.getUserData();
    this.render();
  }

  logout() {
    AuthProvider.logout();
    window.location.reload();
  }

  renderMenu() {
    if (this._userData !== null) {
      // isLoggedIn
      return `
        <li><a>${this._userData?.username}</a></li>
        <li><a id="${this._logoutBtnId}">Logout</a></li>
      `;
    } else {
      return `
        <li data-bs-toggle="modal" data-bs-target="#loginForm"><a >LOGIN</a></li>
        <li data-bs-toggle="modal" data-bs-target="#registerForm"><a >REGISTER</a></li>
      `;
    }
  }

  render() {
    this.innerHTML = `
      <header class="">
        <nav class="main-nav d-flex justify-content-center">
          <div class="nav-inner">
            <div class="wrapped-menu">
              <div class="brand">
                <h1 class="brand-title"><a href="/" data-navigo><img src="/favicon.png" alt="notes-logo"> Notes</a></h1>
              </div>
              <div>
                <a href="javascript:void(0)" class="mobile-menu-toggle d-inline d-sm-none" id="${
                  this._navTogglerId
                }"><i class="fas fa-bars"></i></a>
                <ul class="d-sm-flex" id="${this._menuId}">
                  ${this.renderMenu()}
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>
    `;

    $(`#${this._navTogglerId}`).on("click", () => {
      $(`#${this._menuId}`).slideToggle(200);
    });

    $(`#${this._logoutBtnId}`).on("click", () => {
      this.logout();
    });
  }
}

customElements.define("app-header", Header);
