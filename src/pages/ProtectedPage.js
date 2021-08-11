import AuthProvider from "../providers/AuthProvider";

class ProtectedPage {
  constructor() {
    this._user = AuthProvider.getUserData();
    if (!this._user) {
      window.location.replace("/");
    }
  }
}

export default ProtectedPage;
