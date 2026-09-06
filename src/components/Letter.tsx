import { EVENT } from '../data/event'
import type { Guest } from '../data/guests'

export function Letter({ guest }: { guest?: Guest }) {
  return (
    <div className="text-[0.95rem] leading-[1.85] text-ink-soft sm:text-base">
      <p className="font-display text-xl text-ink sm:text-2xl">
        Dear {guest ? guest.shortName : 'friend'},
      </p>

      <p className="mt-5">
        Four years, rather more late nights than I would care to admit, and one very long
        final semester later — I am finally putting on the gown.
      </p>

      <p className="mt-4">
        It would mean a great deal to me to have you there when I do. My youth has been so
        much brighter for having you in it, and this chapter would not feel properly closed
        without you somewhere in the frame.
      </p>

      <p className="mt-4">
        So please come. And stay for the photograph afterwards — I have been saving a place
        in it for you.
      </p>

      <p className="mt-7 text-[0.7rem] uppercase tracking-[0.28em] text-ink-soft/70">
        With gratitude,
      </p>
      <p className="mt-1 font-script text-3xl text-ember-700 sm:text-4xl">
        {EVENT.graduate.name}
      </p>
    </div>
  )
}
