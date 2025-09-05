// src/utils/tokenHelper.js
const TOKEN_KEY = "token";

const tokenHelper = {
  setToken: (token) => localStorage.setItem(TOKEN_KEY, token),
  getToken: () => localStorage.getItem(TOKEN_KEY),
  removeToken: () => localStorage.removeItem(TOKEN_KEY),
};

export default tokenHelper;
