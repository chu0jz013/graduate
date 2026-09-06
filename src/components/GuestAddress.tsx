import type { Guest } from '../data/guests'

export function GuestAddress({ guest }: { guest?: Guest }) {
  return (
    <div className="text-center">
      <p className="text-[0.6rem] uppercase tracking-[0.32em] text-ink-soft/70 sm:text-[0.68rem]">
        {guest ? 'This invitation is for' : 'An invitation'}
      </p>
      {guest && (
        <p className="mt-3 font-display text-3xl font-semibold text-ember-700 sm:text-4xl">
          {guest.name}
        </p>
      )}
    </div>
  )
}
