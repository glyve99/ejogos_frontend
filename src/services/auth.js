export const TOKEN_KEY = "@trilha-frontend/token";

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const isAuthenticated = () => {
  const token = getToken();

  if (!token) return false;
  try {
    const { exp } = JSON.parse(atob(token.split('.')[1]));
    if (exp < new Date().getTime() / 1000) {
      localStorage.removeItem(TOKEN_KEY);
      return false;
    }
  } catch (e) {
    return false;
  }
  return true;
}

export const login = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
}

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
}