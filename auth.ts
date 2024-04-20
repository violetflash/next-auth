import { getUserById, getUserLoginTime, getUserProfile, refreshUserLoginTime } from '@/data/user';
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
      const existingUser = await getUserById(user?.id);
      if (!existingUser) return false;
      // if (!existingUser || !existingUser.emailVerified) return false;
      if (profile && !profile.loginTime) {
        try {
          await refreshUserLoginTime(user.id);
        } catch (e) {
          console.log('error while refreshing login time: >>', e);
        }
      }
      return true;
    }
  },
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt"
  },
  ...authConfig
})