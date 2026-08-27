# Kindred

Kindred is an intergenerational skill and wisdom exchange. It is a pnpm monorepo with a Next.js 14 frontend for Vercel, an Express/Prisma API for Railway, and shared TypeScript/Zod contracts.

## Local development

Requirements: Node.js 20, pnpm 9, and PostgreSQL. Copy `apps/api/.env.example` to `apps/api/.env`, set `DATABASE_URL` and `JWT_SECRET`, then run:

```bash
pnpm install
pnpm --filter api exec prisma migrate deploy
pnpm dev
```

The web app runs at `http://localhost:3000`; the API health check is `http://localhost:4000/health`.

## Deployment

1. Push repo to GitHub.
2. **Railway**: New Project → Deploy from GitHub repo → set root/service to `apps/api` → Add PostgreSQL plugin (auto-sets `DATABASE_URL`) → set `JWT_SECRET` and `CORS_ORIGIN` env vars → deploy → confirm `GET /health` returns 200 → copy the generated public URL.
3. **Vercel**: New Project → import same GitHub repo → set root directory to `apps/web` → set `NEXT_PUBLIC_API_BASE_URL` to the Railway URL from step 2, plus `NEXTAUTH_SECRET`/`NEXTAUTH_URL` → deploy.
4. Update `CORS_ORIGIN` on Railway to include the final Vercel production domain, redeploy API.
5. Verify end-to-end: register a user from the deployed Vercel URL, confirm it writes to Railway Postgres via Prisma Studio (`pnpm --filter api exec prisma studio`).

Vercel should use `apps/web` as its project root. Railway should use `apps/api` as its service root. The checked-in configuration files preserve the monorepo build commands for either dashboard configuration.

## Manual dashboard steps

- Provision Railway PostgreSQL and copy the generated API URL into Vercel.
- Set production `JWT_SECRET`, `CORS_ORIGIN`, `NEXTAUTH_SECRET`, and `NEXTAUTH_URL` values in the respective dashboards.
- Add the Vercel production and preview domains to Railway `CORS_ORIGIN`.
- Configure custom domains, if desired, after the first deploy.