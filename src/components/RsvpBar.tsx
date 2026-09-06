import { useState } from 'react'
import { EVENT } from '../data/event'
import type { Guest } from '../data/guests'
import { copyText } from '../lib/clipboard'

const zaloUrl = `https://zalo.me/${EVENT.contact.zalo}`
const messengerUrl = `https://m.me/${EVENT.contact.messenger}`

export function RsvpBar({ guest }: { guest?: Guest }) {
  const [toast, setToast] = useState<string | null>(null)
  const who = guest ? `${guest.shortName} here` : 'it is me'

  /**
   * Neither zalo.me nor m.me reliably prefills message text for personal
   * accounts, so the message goes to the clipboard and the chat opens beside
   * it — one paste away, which works on every platform.
   */
  async function reply(message: string, url: string) {
    const copied = await copyText(message)
    setToast(copied ? 'Message copied — just paste it 👍' : 'Chat opened — see you there!')
    setTimeout(() => setToast(null), 3000)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const yes = `Hi Hải, ${who} — I'll be there on the 16th! 🎓`
  const no = `Hi Hải, ${who} — I'm so sorry I can't make the 16th, but congratulations!`

  return (
    <div className="text-center">
      <p className="text-[0.6rem] uppercase tracking-[0.32em] text-ink-soft/70 sm:text-[0.68rem]">
        Let me know
      </p>

      <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
        <button
          type="button"
          onClick={() => reply(yes, zaloUrl)}
          className="flex-1 rounded-lg bg-ember-600 px-4 py-3.5 text-[0.85rem] font-medium text-cream-50 transition-colors hover:bg-ember-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember-700"
        >
          I&rsquo;ll be there
        </button>
        <button
          type="button"
          onClick={() => reply(no, zaloUrl)}
          className="flex-1 rounded-lg border border-gold-500/45 px-4 py-3.5 text-[0.85rem] font-medium text-ember-700 transition-colors hover:bg-ember-500/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember-700"
        >
          I can&rsquo;t make it
        </button>
      </div>

      <p className="mt-3.5 text-[0.75rem] text-ink-soft/80">
        Opens Zalo — or reply on{' '}
        <a
          href={messengerUrl}
          target="_blank"
          rel="noreferrer"
          className="underline decoration-gold-500/50 underline-offset-2 hover:text-ember-700"
        >
          Messenger
        </a>
        .
      </p>

      {toast && (
        <div
          role="status"
          className="fixed inset-x-0 bottom-6 z-50 mx-auto w-fit max-w-[90vw] rounded-full bg-ember-950/92 px-5 py-2.5 text-[0.8rem] text-cream-50 shadow-lg"
        >
          {toast}
        </div>
      )}
    </div>
  )
}
