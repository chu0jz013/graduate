/** The mortarboard from the poster, redrawn as vector so it stays crisp. */
export function Mortarboard({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 112" className={className} role="presentation" aria-hidden="true">
      <defs>
        <linearGradient id="cap-board" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0" stopColor="#FFF8EE" />
          <stop offset="0.55" stopColor="#FBE0BC" />
          <stop offset="1" stopColor="#F3B96E" />
        </linearGradient>
        <linearGradient id="cap-crown" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F7CE96" />
          <stop offset="1" stopColor="#D4842A" />
        </linearGradient>
      </defs>

      {/* the crown, behind the board */}
      <path d="M36 48v28c0 9.6 15.2 17.4 34 17.4S104 85.6 104 76V48L70 70Z" fill="url(#cap-crown)" />
      <path d="M36 48v28c0 9.6 15.2 17.4 34 17.4V70Z" fill="#A85F14" opacity="0.18" />

      {/* the board */}
      <path d="M70 8 136 42 70 76 4 42Z" fill="url(#cap-board)" />
      {/* its thin edge — this is what reads as depth */}
      <path d="M4 42v4.5l66 34v-4.5Z" fill="#B9741F" opacity="0.42" />
      <path d="M136 42v4.5L70 80.5V76Z" fill="#B9741F" opacity="0.26" />
      <circle cx="70" cy="42" r="3.4" fill="#D4842A" opacity="0.5" />

      {/* tassel */}
      <path
        d="M129 46c3.5 12 2.4 22-4 30"
        stroke="#FFF1DC"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="124" cy="80" r="5.2" fill="#FFF8EE" />
      <path
        d="M120 84c.6 6 .6 10 0 13M124 85.5v12.5M128 84c-.6 6-.6 10 0 13"
        stroke="#FFF1DC"
        strokeWidth="2.6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

/** A hairline rule broken by a diamond — the engraved divider of a printed card. */
export function GoldRule({
  className = '',
  tone = 'light',
}: {
  className?: string
  tone?: 'light' | 'dark'
}) {
  const line =
    tone === 'light'
      ? 'from-transparent via-cream-50/75 to-cream-50/75'
      : 'from-transparent via-gold-500/50 to-gold-500/50'
  const mark = tone === 'light' ? 'text-cream-50/85' : 'text-gold-500'

  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <span className={`h-px w-16 bg-gradient-to-r sm:w-24 lg:w-32 ${line}`} />
      <svg viewBox="0 0 10 10" className={`size-2 shrink-0 ${mark}`} fill="currentColor">
        <path d="M5 0 7 5 5 10 3 5Z" />
      </svg>
      <span className={`h-px w-16 rotate-180 bg-gradient-to-r sm:w-24 lg:w-32 ${line}`} />
    </div>
  )
}

/**
 * Slow-drifting embers. Values are fixed rather than random so the field looks
 * identical on every load and nothing shifts between renders.
 */
const EMBERS = [
  { left: 6, size: 4, dur: 17, delay: 0, dx: 18, peak: 0.5 },
  { left: 14, size: 3, dur: 22, delay: 3, dx: -12, peak: 0.4 },
  { left: 23, size: 5, dur: 19, delay: 7, dx: 22, peak: 0.55 },
  { left: 31, size: 2, dur: 25, delay: 1, dx: -8, peak: 0.35 },
  { left: 40, size: 4, dur: 16, delay: 9, dx: 14, peak: 0.5 },
  { left: 48, size: 3, dur: 21, delay: 5, dx: -18, peak: 0.45 },
  { left: 57, size: 5, dur: 18, delay: 11, dx: 10, peak: 0.6 },
  { left: 65, size: 2, dur: 24, delay: 2, dx: -14, peak: 0.35 },
  { left: 73, size: 4, dur: 20, delay: 8, dx: 20, peak: 0.5 },
  { left: 81, size: 3, dur: 23, delay: 4, dx: -10, peak: 0.4 },
  { left: 88, size: 5, dur: 17, delay: 13, dx: 16, peak: 0.55 },
  { left: 95, size: 3, dur: 26, delay: 6, dx: -20, peak: 0.4 },
]

export function Embers() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {EMBERS.map((e) => (
        <span
          key={e.left}
          className="animate-drift absolute bottom-0 rounded-full bg-gold-200"
          style={
            {
              left: `${e.left}%`,
              width: e.size,
              height: e.size,
              '--dur': `${e.dur}s`,
              '--delay': `${e.delay}s`,
              '--dx': `${e.dx}px`,
              '--peak': e.peak,
              filter: 'blur(0.3px)',
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  )
}
