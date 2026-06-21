NeuroTools frontend.

## Getting Started

```bash
npm run dev
```

Open `http://localhost:3000` to view the app.

## CI/CD

- GitHub Actions runs `npm ci`, `npm run lint`, and `npm run build` on pull requests and pushes.
- Main branch pushes trigger the Vercel deploy hook when `VERCEL_DEPLOY_HOOK_URL` is set in GitHub secrets.
- Set `NEXT_PUBLIC_API_URL` in Vercel so the frontend points at the deployed backend.

## Deploy on Vercel

Connect this repository to Vercel and enable production deploys from `main`.
