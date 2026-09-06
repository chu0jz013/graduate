import { EVENT } from '../data/event'

/** ISO instant → the basic UTC form iCalendar requires, e.g. 20260916T043000Z */
function toIcsStamp(iso: string): string {
  return new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
}

/** RFC 5545 §3.3.11: backslash, semicolon, comma and newline are special. */
function escapeIcs(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n')
}

/**
 * RFC 5545 §3.1: fold content lines longer than 75 OCTETS — not characters.
 * Vietnamese text is multi-byte in UTF-8, so a line well under 75 characters
 * can still be over the limit. Splitting happens between code points so a
 * character is never cut in half.
 */
function fold(line: string): string {
  const encoder = new TextEncoder()
  if (encoder.encode(line).length <= 75) return line

  const parts: string[] = []
  let current = ''
  let octets = 0

  for (const char of line) {
    const size = encoder.encode(char).length
    if (octets + size > 75) {
      parts.push(current)
      current = ' ' // a continuation line begins with a space, which also counts
      octets = 1
    }
    current += char
    octets += size
  }
  parts.push(current)

  return parts.join('\r\n')
}

const summary = `Graduation of ${EVENT.graduate.name}`
const location = `${EVENT.venue.hall}, ${EVENT.venue.name} — ${EVENT.venue.gate}`

export function buildIcs(): string {
  const description = [
    `The graduation ceremony of ${EVENT.graduate.name}, ${EVENT.school}, ${EVENT.cohort}.`,
    ``,
    `Enter via ${EVENT.venue.gate}`,
    `Map: ${EVENT.venue.mapUrl}`,
  ].join('\n')

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//graduate.quachuoitrenmay.com//Graduation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    'UID:graduation-kieu-nam-hai@graduate.quachuoitrenmay.com',
    `DTSTAMP:${toIcsStamp(new Date().toISOString())}`,
    `DTSTART:${toIcsStamp(EVENT.startsAt)}`,
    `DTEND:${toIcsStamp(EVENT.endsAt)}`,
    fold(`SUMMARY:${escapeIcs(summary)}`),
    fold(`LOCATION:${escapeIcs(location)}`),
    fold(`DESCRIPTION:${escapeIcs(description)}`),
    fold(`URL:${EVENT.site}`),
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
}

/** Hands the viewer a .ics file. Everything happens in the browser. */
export function downloadIcs(): void {
  const blob = new Blob([buildIcs()], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = 'graduation-kieu-nam-hai.ics'
  document.body.append(anchor)
  anchor.click()
  anchor.remove()
  URL.revokeObjectURL(url)
}

export function googleCalendarUrl(): string {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: summary,
    dates: `${toIcsStamp(EVENT.startsAt)}/${toIcsStamp(EVENT.endsAt)}`,
    details: `${EVENT.school} · ${EVENT.cohort}\n\nEnter via ${EVENT.venue.gate}\n${EVENT.venue.mapUrl}`,
    location,
    ctz: 'Asia/Ho_Chi_Minh',
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}
