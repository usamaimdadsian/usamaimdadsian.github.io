# Usama Resume

Next.js portfolio with a protected admin-only resume generator.

## Resume Privacy Model

The public site does not store or render resume versions. Public visitors only see general profile information at `/resume`.

Full resume data lives in Strapi as `Resume Version` records. The admin area at `/admin/resume` logs in with a Strapi Users & Permissions email/password, fetches resume data through protected Next API routes, and generates the PDF in the browser.

Required environment variables are listed in `env.sample`:

```bash
STRAPI_URL=http://localhost:1337
```

Create the admin login user in Strapi under Users & Permissions, then give the authenticated role read access to `Resume Version`. The public role should not have access to `Resume Version`. Do not commit `.env.local`.

## Development

```bash
npm run dev
```

Open `http://localhost:3000`.

## Deployment Note

This app uses server routes for authentication and protected Strapi access, so it is no longer compatible with static-only GitHub Pages export for the protected resume workflow. Deploy it to a server-capable Next host such as Vercel, a VPS, or another Node/serverless platform.
