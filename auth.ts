import { getUserById, getUserLoginTime, getUserProfile, refreshUserLoginTime } from '@/data/user';
import { AUTH_ERROR_ROUTE, LOGIN_ROUTE } from '@/routes';
import NextAuth, {type DefaultSession  } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import authConfig from "@/auth.config"
import { UserRole } from '@prisma/client';

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      role: UserRole;
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"]
  }
}

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth
} = NextAuth({
  callbacks: {
    // https://next-auth.js.org/configuration/callbacks
    async session({ session, token }) {
      console.log('token: >>', token);
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user = {
          ...session.user,
          role: token.role
        }
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token; // not logged in case

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      token.role = existingUser.role;
      return token;
    },
    signIn: async ({ user, account, profile, email, credentials }) => {
      if (profile && !profile.loginTime) {
        try {
          await refreshUserLoginTime(user.id);
        } catch (e) {
          console.log('error while refreshing login time: >>', e);
        }
      }
      // Allow everything (OAuth) without email verification except for "Credentials"
      // TODO be careful with this check if you want to use more OAuth providers
      // TODO because verification will only be checked with "Credentials" login type
      if (account?.provider !== "credentials") return true;

      // For credentials case
      const existingUser = await getUserById(user?.id);
      // Prevent from signing in without email verification
      if (!existingUser?.emailVerified) return false;

      // TODO Add 2FA check
      return true;
    }
  },
  pages: {
    signIn: LOGIN_ROUTE,
    error: AUTH_ERROR_ROUTE
  },
  events: {
    async linkAccount({ account, profile, user }) {
      await  db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }
      })
    }
  },
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt"
  },
  ...authConfig
})