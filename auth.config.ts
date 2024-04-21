// https://authjs.dev/getting-started/migrating-to-v5#edge-compatibility

import { getUserByEmail } from '@/data/user';
import bcrypt from 'bcryptjs';
import type { NextAuthConfig } from "next-auth"
import { LoginSchema } from '@/schemas';
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import VK from "next-auth/providers/vk";

export default { providers: [
  GitHub({
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  }),
  Google({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }),
  VK,
  Credentials({
    async authorize(credentials) {
      const validatedFields = LoginSchema.safeParse(credentials);

      if (validatedFields.success) {
        const { email, password } = validatedFields.data;

        const user = await getUserByEmail(email);
        // if no user or no password in case of login by Google or GitHub
        if (!user || !user.password) return null;

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (isPasswordMatch) return user;
      }
      return null;
    }
  })
  ] } satisfies NextAuthConfig