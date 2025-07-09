import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string;
      email: string;
      roleNames: string[];
    } & DefaultSession["user"];
    accessToken: string;
  }

  interface User {
    id: string;
    name: string;
    email: string;
    roleNames: string[];
    accessToken: string;
  }
}

export type AuthResponse = {
  user: {
    id: string;
    name: string;
    email: string;
    roleNames: string[];
  };
  access_token: string;
};

export type LoginData = {
  email: string;
  password: string;
};