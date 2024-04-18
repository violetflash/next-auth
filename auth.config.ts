// https://authjs.dev/getting-started/migrating-to-v5#edge-compatibility

import { getUserByEmail } from '@/data/user';
import bcrypt from 'bcryptjs';
import type { NextAuthConfig } from "next-auth"
import { LoginSchema } from '@/schemas';
import Credentials from "next-auth/providers/credentials";

export default { providers: [
  Credentials({
    async authorize(credentials) {
      const validatedFields = LoginSchema.safeParse(credentials);

      if (validatedFields.success) {
        const { email, password } = validatedFields.data;

        const user = await getUserByEmail(email);
        // if no user or no password in case of login by Google or GitHub
        if (!user || !user.password) return;

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (isPasswordMatch) return user;
      }
      return null;
    }
  })
  ] } satisfies NextAuthConfig