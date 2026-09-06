import { useState } from 'react'
import { EVENT } from '../data/event'
import { copyText } from '../lib/clipboard'

export function VenueMap() {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    const ok = await copyText(EVENT.venue.address)
    setCopied(ok)
    setTimeout(() => setCopied(false), 2200)
  }

  return (
    <div className="rounded-xl border border-gold-500/25 bg-ember-500/[0.06] p-5 sm:p-6">
      <p className="text-[0.55rem] uppercase tracking-[0.26em] text-ink-soft/70 sm:text-[0.62rem]">
        Getting there
      </p>
      <p className="mt-2.5 text-[0.9rem] leading-relaxed text-ink">{EVENT.venue.address}</p>
      <p className="mt-1.5 text-[0.82rem] leading-relaxed text-ink-soft">
        Enter through {EVENT.venue.gate}.
      </p>

      <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
        <a
          href={EVENT.venue.mapUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-ember-600 px-4 py-3 text-[0.82rem] font-medium text-cream-50 transition-colors hover:bg-ember-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember-700"
        >
          <svg
            viewBox="0 0 24 24"
            className="size-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11Z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
          Open in Maps
        </a>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-gold-500/45 px-4 py-3 text-[0.82rem] font-medium text-ember-700 transition-colors hover:bg-ember-500/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember-700"
        >
          {copied ? 'Address copied' : 'Copy address'}
        </button>
      </div>

      <p className="mt-3 text-[0.72rem] leading-relaxed text-ink-soft/75">
        Copying the address is the quickest way to paste it into Grab or show it to a driver.
      </p>
    </div>
  )
}
