This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


========================
## Register [by credentials] flow:
1. When the user register, using the [`register (./actions/register.ts)`](./actions/register.ts)  server action - we: 
   - generate a new verification Token
   - send verification email to that email address. This email provides verification url with `VERIFICATION_ROUTE` which is available for the public routes ([`./routes.ts - publicRoutes array`](./routes.ts))
   - By this email link user will be redirected to the [`NewVerificationPage (./app/auth/new-verification/page.tsx)`](./app/auth/new-verification/page.tsx) , where we can get the token from search params and automatically run the checkToken function.
     - If no Token provided in the search params - show error: "Missing token"
   - Provided Token goes to [`verify-token (./actions/register.ts)`](./actions/register.ts) server action where:
     - We search the Token in DB. 
     - If no such Token - return error: "Token does not exist"
     - If Token and Token has already expired - return error: "Token has expired"
     - If Token and it isn't expired yet - get User from DB by this Token.email
     - If no such User - return error: "Email does not exist" (this can happen if user has changed his email and using his previous verification link)
     - If all good - we update the User, by verifying him (also we update his email - the same action reused in the "change email feature" logic)
     - Remove the old verification Token and return success message: "Email verified"
  - 
   
