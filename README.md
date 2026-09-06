# graduate.quachuoitrenmay.com

Personalised invitations to the graduation ceremony of **Kiều Nam Hải** —
FPT University, Class of 2026.

Each guest gets their own URL:

```
https://graduate.quachuoitrenmay.com/dao-trong-an
https://graduate.quachuoitrenmay.com/dang-sang
```

Every one is a **real static HTML file**, not a client-side route, so it is
served with HTTP 200 and carries that guest's name in its `<title>` and Open
Graph tags. That is what makes the link preview in Zalo or Messenger read
*"Đào Trọng An — you are invited"* instead of something generic.

## Adding a guest

Add one object to `src/data/guests.json` and rebuild. Nothing else to touch.

```json
{
  "slug": "nguyen-van-a",
  "name": "Nguyễn Văn A",
  "shortName": "A",
  "note": "One line written for this person alone."
}
```

- `slug` — the URL segment. `src/lib/slug.ts` generates the right one from a
  Vietnamese name (`toSlug('Nguyễn Văn A')` → `nguyen-van-a`).
- `note` — optional. Leave it out and the block simply is not rendered.

An unknown slug falls back to the unaddressed card rather than an error page.

## Editing the event

Every fact — time, venue, gate, dress, map link, contact — lives in
`src/data/event.ts`. No component hardcodes any of it.

> **Before sending any links out**, fill in `EVENT.contact.zalo` and
> `EVENT.contact.messenger`. They ship as placeholders.

## Commands

```bash
npm run dev       # local dev server
npm run build     # tsc → vite build (into docs/) → per-guest prerender
npm run preview   # serve the built docs/ folder
npm run lint      # oxlint
```

## How it is built

- **React 19 + TypeScript + Vite 8**, routed with `react-router` (`src/router.tsx`).
- **Tailwind CSS v4**, with the palette in `src/index.css` sampled pixel-by-pixel
  from the official poster in `public/images/background.png`.
- Fonts are self-hosted via `@fontsource`. All three — Cormorant Garamond,
  Be Vietnam Pro, Dancing Script — carry the **Vietnamese subset**, which most
  elegant script faces (Great Vibes, Parisienne) do not; without it the
  diacritics in names like *Đặng Sáng* break.
- `scripts/prerender.mjs` runs after `vite build` and writes one folder per
  guest, plus `404.html`. It derives every string from the built HTML, so there
  is no second copy of the event details to drift.

## Deployment

Pushing to `master` triggers `.github/workflows/deploy.yml`, which builds and
commits `docs/` back to the branch. GitHub Pages serves that folder.

One-time setup, which must be done by hand:

1. **Settings → Pages** → Source: *Deploy from a branch* → `master` / `/docs`.
   Set the custom domain to `graduate.quachuoitrenmay.com` and enable
   *Enforce HTTPS*.
2. **Cloudflare DNS** for `quachuoitrenmay.com` → add a `CNAME` record,
   name `graduate`, target `chu0jz013.github.io`, with **Proxy status set to
   DNS only (grey cloud)**. With the orange cloud on, GitHub cannot complete
   the certificate challenge and HTTPS will never finish provisioning. You can
   switch the proxy on afterwards, but only with Cloudflare SSL mode on
   *Full (strict)*.
3. The repository must be **public**, or the account needs GitHub Pro —
   Pages-from-a-branch is not available on free private repos.
