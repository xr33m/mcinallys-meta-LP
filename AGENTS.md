# Project notes for coding agents

- Stack: Next.js 15.5 (App Router) + React 19 + Tailwind CSS **3.4**. This is deliberate: the project must preview in
  bolt.new / StackBlitz (WebContainers), which cannot load native binaries. Do **not** upgrade to Next 16 or Tailwind 4
  (native compiler, `oxide`, `lightningcss`) without confirming the Bolt preview still works.
- Fonts come from npm (`@fontsource/*`), not `next/font/google`, so no network fetch is needed in the preview.
- `next/image` is set to `unoptimized` because `sharp` is native.
- All editable business content lives in `src/lib/config.ts`.
- Do not add a `.env.example` file: Bolt deletes `.env*` files. Env vars are documented in README.md.
