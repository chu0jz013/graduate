import { downloadIcs, googleCalendarUrl } from '../lib/calendar'

const base =
  'inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-gold-500/45 px-4 py-3 text-[0.82rem] font-medium text-ember-700 transition-colors hover:bg-ember-500/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember-700'

export function CalendarButtons() {
  return (
    <div className="flex flex-col gap-2.5 sm:flex-row">
      <button type="button" onClick={downloadIcs} className={base}>
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
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 10h18M8 3v4M16 3v4M12 14v4M10 16h4" />
        </svg>
        Add to calendar
      </button>

      <a href={googleCalendarUrl()} target="_blank" rel="noreferrer" className={base}>
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
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 10h18M8 3v4M16 3v4" />
        </svg>
        Google Calendar
      </a>
    </div>
  )
}
