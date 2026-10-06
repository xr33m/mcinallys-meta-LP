# Project notes for coding agents

- Stack: Next.js **14.2.35** (App Router) + React **18** + Tailwind CSS **3.4**. This is deliberate: the project must preview in
  bolt.new / StackBlitz (WebContainers). Native binaries (Next 16 SWC, Tailwind 4 `oxide`/`lightningcss`, `sharp`) cannot load there,
  and Next 15 crashes in Bolt with `Invariant: Expected workUnitAsyncStorage to have a store` (WebContainers only partly support
  AsyncLocalStorage). Do **not** upgrade Next, React or Tailwind without confirming the Bolt preview still works.
- Keep `"dev": "next dev"`. The `--webpack` flag does not exist in Next 14.
- Fonts come from npm (`@fontsource/*`), not `next/font/google`, so no network fetch is needed in the preview.
- `next/image` is set to `unoptimized` because `sharp` is native.
- All editable business content lives in `src/lib/config.ts`.
- Do not add a `.env.example` file: Bolt deletes `.env*` files. Env vars are documented in README.md.
