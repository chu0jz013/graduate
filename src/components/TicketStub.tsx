import { QRCodeSVG } from 'qrcode.react'
import { EVENT } from '../data/event'
import type { Guest } from '../data/guests'

/**
 * A pass the guest can screenshot. The QR points at the canonical production
 * URL rather than window.location, so a code scanned from a photo still works
 * even if the shot was taken from a preview build.
 */
export function TicketStub({ guest, seat }: { guest?: Guest; seat: string }) {
  const url = guest ? `${EVENT.site}/${guest.slug}` : EVENT.site

  return (
    <div className="ticket paper flex overflow-hidden rounded-xl">
      <div className="min-w-0 flex-1 px-5 py-5 sm:px-6">
        <p className="text-[0.55rem] uppercase tracking-[0.3em] text-ember-600">Admit one</p>

        <p className="mt-2.5 truncate font-display text-2xl font-semibold text-ink sm:text-[1.7rem]">
          {guest ? guest.name : 'A friend of the family'}
        </p>

        <div className="mt-3.5 space-y-1 text-[0.72rem] uppercase tracking-[0.14em] text-ink-soft sm:text-[0.76rem]">
          <p>
            {EVENT.display.dateShort} · {EVENT.display.timeShort}
          </p>
          <p className="truncate">{EVENT.venue.hall} · VNCC</p>
        </div>
      </div>

      <div className="flex w-[32%] shrink-0 flex-col items-center justify-center gap-2 border-l border-dashed border-gold-500/45 px-2 py-5">
        <QRCodeSVG
          value={url}
          size={72}
          bgColor="transparent"
          fgColor="#3A1405"
          level="M"
          marginSize={0}
        />
        <p className="text-[0.55rem] uppercase tracking-[0.18em] text-ink-soft/80">{seat}</p>
      </div>
    </div>
  )
}
