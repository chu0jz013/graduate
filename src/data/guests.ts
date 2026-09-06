import raw from './guests.json'

export type Guest = {
  /** URL segment, e.g. "dao-trong-an" → /dao-trong-an */
  slug: string
  /** Full name as it should be printed on the card */
  name: string
  /** Familiar name, used in the RSVP message */
  shortName: string
  /** One line written for this person alone. Omit and the block is not rendered. */
  note?: string
}

export const GUESTS = raw as Guest[]

export function findGuest(slug: string | undefined): Guest | undefined {
  if (!slug) return undefined
  return GUESTS.find((guest) => guest.slug === slug)
}
