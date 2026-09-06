import type { ReactNode } from 'react'
import { EVENT } from '../data/event'

function Row({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="flex gap-3.5">
      <span className="mt-0.5 shrink-0 text-ember-600" aria-hidden="true">
        {icon}
      </span>
      <div className="min-w-0">
        <div className="text-[0.55rem] uppercase tracking-[0.26em] text-ink-soft/70 sm:text-[0.62rem]">
          {label}
        </div>
        <div className="mt-1 text-[0.9rem] leading-relaxed text-balance text-ink sm:text-[0.95rem]">
          {children}
        </div>
      </div>
    </div>
  )
}

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function DetailsGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-7 lg:grid-cols-1 lg:gap-6">
      <Row
        label="When"
        icon={
          <svg viewBox="0 0 24 24" className="size-5" {...stroke}>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5.2l3.2 2" />
          </svg>
        }
      >
        {EVENT.display.time}
        <br />
        <span className="text-ink-soft">{EVENT.display.date}</span>
      </Row>

      <Row
        label="Where"
        icon={
          <svg viewBox="0 0 24 24" className="size-5" {...stroke}>
            <path d="M3 21h18M5 21V9l7-5 7 5v12" />
            <path d="M10 21v-5h4v5" />
          </svg>
        }
      >
        {EVENT.venue.hall}
        <br />
        <span className="text-ink-soft">{EVENT.venue.name}</span>
      </Row>

      <Row
        label="Entrance"
        icon={
          <svg viewBox="0 0 24 24" className="size-5" {...stroke}>
            <path d="M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11Z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
        }
      >
        {EVENT.venue.gate}
      </Row>

      <Row
        label="Dress"
        icon={
          <svg viewBox="0 0 24 24" className="size-5" {...stroke}>
            <path d="M9 3.5 12 6l3-2.5 5 3-2 4-2-1v8.5a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V9.5l-2 1-2-4Z" />
          </svg>
        }
      >
        {EVENT.dress}
      </Row>
    </div>
  )
}
