# Next.js Migration

The application was migrated from Vite to Next.js using the App Router.

## Scripts

- `npm run dev`: starts the development environment.
- `npm run build`: creates the production build.
- `npm run start`: serves the production build.
- `npm run lint`: runs ESLint.
- `npm run typecheck`: validates TypeScript without emitting files.

## Environment Variables

Recommended variables:

- `NEXT_PUBLIC_API_URL`: Render backend URL.
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase project anon key.

Example:

```bash
NEXT_PUBLIC_API_URL=https://backend-ma1y.onrender.com
NEXT_PUBLIC_SUPABASE_URL=https://TU-PROYECTO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=TU_ANON_KEY
```
