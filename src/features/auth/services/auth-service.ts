import { axiosInstance } from "@/lib/axios/axios-config";
import { AuthResponse, LoginData, } from "../types/auth-types";
import { User } from "next-auth";

export const authService = {
  login: async (credentials: LoginData): Promise<AuthResponse> => {
    const { data } = await axiosInstance.post("/login", credentials);
    return data;
  },
  getCurrentUser: async (): Promise<User> => {
    const { data } = await axiosInstance.get("/me");
    return data;
  },
};