/**
 * Turns the single built index.html into one real static page per guest.
 *
 *   docs/index.html            the unaddressed card
 *   docs/dao-trong-an/index.html
 *   docs/dang-sang/index.html
 *   docs/404.html              fallback for a mistyped path
 *
 * These are real files, so GitHub Pages serves them with HTTP 200. That
 * matters: the whole point of the site is that the link gets pasted into Zalo
 * and Messenger, and some link crawlers will not render a preview for a page
 * served with a 404 status — which is all the SPA-style 404.html trick can
 * give you.
 *
 * Every string it needs is derived from the built HTML itself, so there is no
 * second copy of the event details to drift out of sync.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'docs')

const guests = JSON.parse(await readFile(join(root, 'src/data/guests.json'), 'utf8'))
const template = await readFile(join(outDir, 'index.html'), 'utf8')

const escapeAttr = (value) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** Replace a meta tag's content, failing loudly rather than silently no-opping. */
function setMeta(html, attr, name, value) {
  const pattern = new RegExp(`(<meta\\s+${attr}="${name}"\\s+content=")[^"]*(")`, 'i')
  if (!pattern.test(html)) {
    throw new Error(`prerender: no <meta ${attr}="${name}"> in the built index.html`)
  }
  return html.replace(pattern, `$1${escapeAttr(value)}$2`)
}

const baseTitle = template.match(/<title>([^<]*)<\/title>/)?.[1]
const baseUrl = template.match(/<meta\s+property="og:url"\s+content="([^"]*)"/)?.[1]
if (!baseTitle || !baseUrl) {
  throw new Error('prerender: built index.html is missing its <title> or og:url')
}
const origin = baseUrl.replace(/\/$/, '')

for (const guest of guests) {
  const title = `${guest.name} · ${baseTitle}`
  const ogTitle = `${guest.name} — you are invited`
  const url = `${origin}/${guest.slug}`

  let html = template.replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(title)}</title>`)
  html = setMeta(html, 'property', 'og:title', ogTitle)
  html = setMeta(html, 'property', 'og:url', url)
  html = setMeta(html, 'name', 'twitter:title', ogTitle)

  await mkdir(join(outDir, guest.slug), { recursive: true })
  await writeFile(join(outDir, guest.slug, 'index.html'), html)
  console.log(`  ${guest.slug}/index.html  →  ${guest.name}`)
}

// A mistyped path falls back to the unaddressed card rather than an error page.
await writeFile(join(outDir, '404.html'), template)

// Stop GitHub Pages running the output through Jekyll.
await writeFile(join(outDir, '.nojekyll'), '')

console.log(`prerender: ${guests.length} guest pages + 404.html`)
