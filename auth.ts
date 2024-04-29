import authConfig from "@/auth.config"
import { get2FAConfirmationByUserId } from '@/data/two-factor-cinfirmation';
import { getUserById } from '@/data/user';
import { db } from "@/lib/db";
import { AUTH_ERROR_ROUTE, LOGIN_ROUTE } from '@/lib/routes-constants';
import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserRole } from '@prisma/client';
import NextAuth, { type DefaultSession } from "next-auth"

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
      // get user id from session token
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
      console.log({
        user, account
      })

      // TODO тут проблема при авторизации через OAuth, призма кидает ошибку в консоль
      // if (profile && !profile.loginTime) {
      //   try {
      //     await refreshUserLoginTime(user.id);
      //   } catch (e) {
      //     console.log('error while refreshing login time: >>', e);
      //   }
      // }


      // Allow everything (OAuth) without email verification except for "Credentials"
      // TODO be careful with this check if you want to use more OAuth providers
      // TODO because verification will only be checked with "Credentials" login type
      if (account?.type !== "credentials") return true;

      // For credentials case
      const existingUser = await getUserById(user?.id);
      // Prevent from signing in without email verification
      if (!existingUser?.email_verified_at) return false;

      // TODO Add 2FA check
      if (existingUser?.is_two_factor_enabled) {
        // check if user has two factor (created in login.ts action)
        const twoFactorConfirmation = await get2FAConfirmationByUserId(existingUser.id);
        console.log('twoFactorConfirmation: >>', twoFactorConfirmation);
        if (!twoFactorConfirmation) return false;
        // TODO but we can add expired_at field in 2FA confirmation prisma model, and check if it's expired first
        // Every time user logs in, it will be asked for 2FA code again
        // Delete 2FA confirmation for the next login
        await db.twoFactorConfirmation.delete({ where: { id: twoFactorConfirmation.id } });
        return true;
      }
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
        data: { email_verified_at: new Date() }
      })
    }
  },
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt"
  },
  ...authConfig
})