import { fetchApi } from "../lib/api";
import { LoginCredentials, LoginResponse } from "../types/auth";

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await fetchApi<LoginResponse>("/users/login", {
      method: "POST",
      body: credentials,
    });
    //console.log("Login API Response:", response);
    return response;
  },

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  setToken(token: string) {
    localStorage.setItem("token", token);
  },

  getToken(): string | null {
    return localStorage.getItem("token");
  },

  setUser(user: any) {
    localStorage.setItem("user", JSON.stringify(user));
  },

  getUser(): any | null {
    const user = localStorage.getItem("user");
    if (!user || user === "undefined") return null;
    try {
      return JSON.parse(user);
    } catch (e) {
      console.error("Error parsing user from localStorage", e);
      return null;
    }
  }
};
