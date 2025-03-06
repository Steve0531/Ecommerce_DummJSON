import { create } from "zustand";
import { IUserDetails } from "../types/Products";
import { loginUser } from "../api/authApi";

interface IAuthState {
  token: string | null;
  isAuthenticated: boolean;
  role: "admin" | "user" | null;
  userDetails: IUserDetails | null;

  login: (username: string, password: string) => Promise<"admin" | "user" | false>;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<IAuthState>((set) => ({
  token: localStorage.getItem("accessToken") || null,
  isAuthenticated: !!localStorage.getItem("accessToken"),
  role: (localStorage.getItem("role") as "admin" | "user") || null,
  userDetails: JSON.parse(localStorage.getItem("userDetails") || "null"),

  login: async (username, password) => {
    try {
      const data = await loginUser(username, password);

      const userDetails: IUserDetails = {
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        gender: data.gender,
      };

      set({
        token: data.accessToken,
        isAuthenticated: true,
        role: data.role,
        userDetails,
      });

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("role", data.role);
      localStorage.setItem("userDetails", JSON.stringify(userDetails));

      return data.role;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  },

  logout: () => {
    set({
      token: null,
      isAuthenticated: false,
      role: null,
      userDetails: null,
    });

    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
    localStorage.removeItem("userDetails");

    console.log("Logged Out");
  },

  checkAuth: () => {
    const token = localStorage.getItem("accessToken");
    const role = localStorage.getItem("role") as "admin" | "user" | null;
    const userDetails = JSON.parse(localStorage.getItem("userDetails") || "null");

    set({
      token,
      isAuthenticated: !!token,
      role,
      userDetails,
    });
  },
}));
