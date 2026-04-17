# AyurGlow
Ayurglo Aesthetic - Ayurvedic skincare and haircare products.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Deploy on Cloudflare Pages (GitHub Actions)

A workflow is configured at `.github/workflows/deploy-pages.yml` to deploy on every push to `main`.

Set these repository secrets in GitHub before running the workflow:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

The workflow will:

1. Install dependencies with `npm ci`
2. Apply remote D1 migrations with `npx wrangler d1 migrations apply aayurglow-db-20260417 --remote`
3. Run `npm run deploy:ci` (build with `next-on-pages` and deploy to Cloudflare Pages)

### Local Deploy Behavior on Windows

- `npm run deploy` is intentionally blocked on Windows and prints CI instructions immediately.
- Use GitHub Actions for deployment (push to `main` or run workflow manually).
- If you are on Linux/WSL, use `npm run deploy:ci` for direct deploy.

