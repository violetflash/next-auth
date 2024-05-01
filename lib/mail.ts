import { TOKEN_QUERY_PARAM } from '@/lib/constants';
import { NEW_PASSWORD_ROUTE, VERIFICATION_ROUTE } from '@/lib/routes-constants';
import { Resend } from 'resend';

type SendEmailProps = {
  email: string;
  token: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendVerificationEmail = async ({ email, token }: SendEmailProps) => {

  const confirmationUrl = `${domain}${VERIFICATION_ROUTE}?${TOKEN_QUERY_PARAM}=${token}`;

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

export const sendResetPasswordEmail = async ({ email, token }: SendEmailProps) => {

  const resetPasswordUrl = `${domain}${NEW_PASSWORD_ROUTE}?${TOKEN_QUERY_PARAM}=${token}`;

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
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: '2FA Code',
      html: `
        <h2>Your 2FA Code:</h2>
        <h1>${token}</h1>
        <p>Please copy and paste the following code into your 2FA app</p>
      `,
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      }
    });
  } catch (e) {
    console.log('e: >>', e);
  }
}