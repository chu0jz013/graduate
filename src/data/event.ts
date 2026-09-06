/**
 * Every fact about the ceremony lives here, so no component hardcodes one.
 *
 * The hall, gate and dates are taken from the official poster in
 * public/images/background.png, which prints them along its lower edge.
 */
export const EVENT = {
  graduate: { name: 'Kiều Nam Hải', latin: 'Kieu Nam Hai' },
  school: 'FPT University',
  cohort: 'Class of 2026',
  tagline: 'Rising Together with the Nation',

  /** Machine-readable, for the countdown and the calendar files. */
  startsAt: '2026-09-16T11:30:00+07:00',
  endsAt: '2026-09-16T13:30:00+07:00',

  /**
   * Display strings are fixed rather than derived from the viewer's clock:
   * the ceremony starts at 11:30 in Hanoi regardless of where the card is
   * opened, and formatting it locally would quietly show the wrong hour to
   * anyone abroad.
   */
  display: {
    time: '11:30 in the morning',
    timeShort: '11:30 AM',
    date: 'Wednesday, 16 September 2026',
    dateShort: '16 Sep 2026',
  },

  venue: {
    hall: 'Main Meeting Hall',
    name: 'Vietnam National Convention Center',
    gate: 'Gate No. 1 — Thăng Long Boulevard, Tu Liem, Hanoi',
    address: 'Trung tâm Hội nghị Quốc gia, 57 Phạm Hùng, Mễ Trì, Nam Từ Liêm, Hà Nội',
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=Trung+t%C3%A2m+H%E1%BB%99i+ngh%E1%BB%8B+Qu%E1%BB%91c+gia%2C+57+Ph%E1%BA%A1m+H%C3%B9ng%2C+H%C3%A0+N%E1%BB%99i',
  },

  dress: 'Smart casual — something you would want to be photographed in',

  /** TODO: fill these in before sending any links out. */
  contact: {
    zalo: '0961513848',
    messenger: 'namhaikieuu',
  },

  site: 'https://graduate.quachuoitrenmay.com',
} as const
