/** The actual ask: come, and stay for the photograph. */
export function PhotoMoment() {
  const corner =
    'absolute size-5 border-gold-500/55 pointer-events-none'

  return (
    <div className="relative px-5 py-7 text-center sm:px-8 sm:py-9">
      {/* registration marks, as on a photographic print */}
      <span className={`${corner} left-0 top-0 border-l border-t`} aria-hidden="true" />
      <span className={`${corner} right-0 top-0 border-r border-t`} aria-hidden="true" />
      <span className={`${corner} bottom-0 left-0 border-b border-l`} aria-hidden="true" />
      <span className={`${corner} bottom-0 right-0 border-b border-r`} aria-hidden="true" />

      <p className="text-[0.6rem] uppercase tracking-[0.32em] text-ember-600 sm:text-[0.68rem]">
        Save a frame for us
      </p>

      <p className="mx-auto mt-4 max-w-sm font-display text-xl leading-snug text-ink sm:text-2xl">
        The gown comes off at some point. The photograph doesn&rsquo;t.
      </p>

      <p className="mx-auto mt-3.5 max-w-sm text-[0.88rem] leading-relaxed text-ink-soft">
        Find me on the steps right after the ceremony — cap still on, tassel still crooked.
        One frame, the two of us.
      </p>
    </div>
  )
}
