import { useEffect, useState } from 'react'
import { EVENT } from '../data/event'

const TARGET = new Date(EVENT.startsAt).getTime()

type Remaining = { days: number; hours: number; minutes: number; seconds: number }

function remaining(): Remaining | null {
  const ms = TARGET - Date.now()
  if (ms <= 0) return null
  const total = Math.floor(ms / 1000)
  return {
    days: Math.floor(total / 86_400),
    hours: Math.floor((total % 86_400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  }
}

export function Countdown() {
  const [left, setLeft] = useState<Remaining | null>(remaining)

  useEffect(() => {
    const id = setInterval(() => setLeft(remaining()), 1000)
    return () => clearInterval(id)
  }, [])

  if (!left) {
    return (
      <p className="text-center font-display text-2xl text-ember-700">
        The tassel has turned. Thank you for being there.
      </p>
    )
  }

  /**
   * Hours, minutes and seconds are zero-padded so the tiles hold still as they
   * tick — Cormorant's figures are not tabular, and 9 → 10 would otherwise jump.
   */
  const pad = (n: number) => String(n).padStart(2, '0')
  const tiles: [string, string][] = [
    [String(left.days), left.days === 1 ? 'day' : 'days'],
    [pad(left.hours), left.hours === 1 ? 'hour' : 'hours'],
    [pad(left.minutes), 'minutes'],
    [pad(left.seconds), 'seconds'],
  ]

  return (
    <div className="text-center">
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-2.5 lg:gap-3">
        {tiles.map(([value, label]) => (
          <div
            key={label}
            className="rounded-lg border border-gold-500/25 bg-gradient-to-b from-ember-500/10 to-ember-700/10 px-2 py-4 lg:py-5"
          >
            <div className="font-display text-4xl font-semibold text-ember-700 sm:text-[2rem] lg:text-[2.6rem]">
              {value}
            </div>
            <div className="mt-1 text-[0.55rem] uppercase tracking-[0.2em] text-ink-soft/75 sm:text-[0.58rem] lg:text-[0.62rem]">
              {label}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[0.7rem] uppercase tracking-[0.28em] text-ink-soft/70">
        until the tassel turns
      </p>
    </div>
  )
}
