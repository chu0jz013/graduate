import { Link } from 'react-router'
import { Hero } from '../components/Hero'
import { EVENT } from '../data/event'

/**
 * Only deep paths land here — a single mistyped segment still matches "/:slug"
 * and gets the unaddressed card, which is a kinder failure than an error page.
 */
export function NotFoundPage() {
  return (
    <main className="ember-field grain relative flex min-h-dvh flex-col overflow-hidden">
      <Hero />

      <div className="mx-auto w-full max-w-[38rem] px-4 pb-16 text-center sm:px-6">
        <div className="paper gold-frame rounded-2xl px-6 py-10 sm:px-10">
          <p className="font-display text-2xl text-ink">That link went somewhere odd.</p>
          <p className="mt-3 text-[0.9rem] leading-relaxed text-ink-soft">
            The invitation is still here — check the link you were sent, or open the card
            without a name.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex rounded-lg bg-ember-600 px-5 py-3 text-[0.85rem] font-medium text-cream-50 transition-colors hover:bg-ember-700"
          >
            Open the invitation
          </Link>
        </div>

        <p className="mt-8 text-[0.68rem] uppercase tracking-[0.28em] text-cream-50/60">
          {EVENT.school} · {EVENT.cohort}
        </p>
      </div>
    </main>
  )
}
