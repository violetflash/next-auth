import { TOKEN_QUERY_PARAM } from '@/lib/constants';
import { NEW_PASSWORD_ROUTE, VERIFICATION_ROUTE } from '@/lib/routes-constants';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {

  const confirmationUrl = `http://localhost:3000${VERIFICATION_ROUTE}?${TOKEN_QUERY_PARAM}=${token}`;

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Please confirm your email',
      html: `
        <h1>Please confirm your email</h1>
        <p>Please confirm your email by clicking on the following link</p>
        <a href="${confirmationUrl}">${confirmationUrl}</a>
      `,
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      }
    });
  } catch (e) {
    console.log('e: >>', e);
  }
};

export const sendResetPasswordEmail = async (email: string, token: string) => {

  const resetPasswordUrl = `http://localhost:3000${NEW_PASSWORD_ROUTE}?${TOKEN_QUERY_PARAM}=${token}`;

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Reset your password',
      html: `
        <h1>Reset your password</h1>
        <p>Please reset your password by clicking on the following link</p>
        <a href="${resetPasswordUrl}">${resetPasswordUrl}</a>
      `,
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      }
    });
  } catch (e) {
    console.log('e: >>', e);
  }
}