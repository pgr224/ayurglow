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

## Deploy on Cloudflare Pages (Direct From Terminal)

Use local terminal deploy as the primary path:

1. Login once: `npx wrangler login`
2. Optional (if migrations changed): `npx wrangler d1 migrations apply aayurglow-db-20260417 --remote`
3. Deploy: `npm run deploy`

`npm run deploy` now runs a direct local build + Pages deploy:

- `next-on-pages`
- `wrangler pages deploy .vercel/output/static --project-name ayurglow --branch main`

On Windows, a small patch script runs automatically to work around a known `next-on-pages` issue where it tries to spawn `npx` directly. The build wrapper also enables npm legacy peer dependency resolution during the Vercel build phase.

### GitHub usage

- GitHub is used only to store source code.
- The workflow at `.github/workflows/deploy-pages.yml` is manual-only (`workflow_dispatch`) and does not run on every push.

