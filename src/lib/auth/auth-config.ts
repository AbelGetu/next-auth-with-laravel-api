import { authService } from "@/features/auth/services/auth-service";
import CredentialsProvider from "next-auth/providers/credentials";
// import { AuthResponse } from "@/features/auth/types/auth-types";
import { NextAuthOptions } from "next-auth";

interface UserToken {
  id: string;
  name: string;
  email: string;
  roleNames: string[];
  accessToken: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { user, access_token } = await authService.login({
            email: credentials?.email || "",
            password: credentials?.password || "",
          });

          if (!user || !access_token) {
            return null;
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            roleNames: user.roleNames,
            accessToken: access_token,
          };
        } catch (error) {
            console.log('error', error)
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as UserToken;
        return {
          ...token,
          id: u.id,
          name: u.name,
          email: u.email,
          roleNames: u.roleNames,
          accessToken: u.accessToken,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          name: token.name as string,
          email: token.email as string,
          roleNames: token.roleNames as string[],
        },
        accessToken: token.accessToken as string,
      };
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};