import { VERIFICATION_ROUTE } from '@/routes';
import { Resend } from 'resend';
export const TOKEN_QUERY_PARAM = 'token';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {

  const confirmationUrl = `http://localhost:3000/auth${VERIFICATION_ROUTE}?${TOKEN_QUERY_PARAM}=${token}`;

  try {
    const response = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Please confirm your email',
      html: `
        <h1>Please confirm your email</h1>
        <p>Please confirm your email by clicking on the following link</p>
        <a href="${confirmationUrl}">${confirmationUrl}</a>
      `
    });
  } catch (e) {
    console.log('e: >>', e);
  }
}