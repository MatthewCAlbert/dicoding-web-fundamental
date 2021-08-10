class AuthProvider {
  static storageKey = "dicoding_moop_userdata";
  static tokenStorageKey = "api_dicoding_moop_token";

  static login = (userData, token) => {
    localStorage.setItem(this.storageKey, JSON.stringify(userData));
    localStorage.setItem(this.tokenStorageKey, token);
  };

  static logout = (callback = () => {}) => {
    localStorage.removeItem(this.storageKey);
    localStorage.removeItem(this.tokenStorageKey);
    callback();
  };

  static getUserData = () => {
    try {
      return JSON.parse(localStorage.getItem(this.storageKey));
    } catch (e) {
      return null;
    }
  };
}

export default AuthProvider;
