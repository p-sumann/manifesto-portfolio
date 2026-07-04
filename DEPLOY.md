# Deploy — sumanpaudel.me

Fonts are bumped one step up. Static build is in `out/`. Here's how to ship it.

## Option A — Vercel (recommended)

Vercel is the best home for Next.js. You don't even need `output: "export"` (but keeping it is fine).

**Steps:**
1. Push this repo to GitHub (any repo, public or private).
2. Go to https://vercel.com → "Add New Project" → Import the repo.
3. Framework preset auto-detects as Next.js. Click **Deploy**. Done in ~45 seconds.
4. In the project → **Settings → Domains** → add `sumanpaudel.me` and `www.sumanpaudel.me`.
5. Vercel gives you DNS records. At your registrar (where you bought sumanpaudel.me):
   - `A` record: `@` → `76.76.21.21`
   - `CNAME` record: `www` → `cname.vercel-dns.com`
6. Wait 5–30 min for DNS to propagate. HTTPS is automatic.

## Option B — GitHub Pages (current setup)

The `out/` folder already contains `CNAME` (= sumanpaudel.me) and `.nojekyll`. Push it to `p-sumann.github.io` (or any repo with Pages enabled):

```bash
cd out
git init -b main
git add -A
git commit -m "deploy terminal manifesto"
git remote add origin git@github.com:p-sumann/p-sumann.github.io.git
git push -f origin main
```

Then GitHub → repo **Settings → Pages** → source = `main` branch, root. Custom domain = `sumanpaudel.me`.

## Removing the domain from GitHub (when moving to Vercel)

Yes, this works cleanly:
1. GitHub repo → **Settings → Pages** → clear the "Custom domain" field → Save.
2. At your DNS registrar, update the records to point at Vercel (step 5 above). The old `A` records pointing at GitHub's `185.199.108.153` etc. must be replaced, not just added.
3. Wait for DNS propagation. Vercel will then claim the domain and issue a cert.

You can keep the GitHub repo and Pages site alive — removing the custom domain just means `sumanpaudel.me` stops resolving to GitHub and starts resolving to Vercel. The `p-sumann.github.io` URL itself still works as a fallback.

## Local preview

```bash
cd out && python3 -m http.server 8000
# → http://localhost:8000
```

## Rebuilding after edits

```bash
npm run build   # regenerates out/
```
