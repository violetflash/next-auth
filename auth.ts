import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import authConfig from "@/auth.config"

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth
} = NextAuth({
  callbacks: {
    // https://next-auth.js.org/configuration/callbacks
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token }) {
      console.log('token: >>', token);
      token.customField = 'customValue';
      return token
    },
    signIn: async ({ user, account, profile, email, credentials }) => {
      if (user.id) {
        try {
          await db.userLoginStat.update({
            where: {
              userId: user.id
            },
            data: {
              timestamp: new Date().toISOString()
            }
          })
        } catch (e) {
          console.log('error: >>', e);
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