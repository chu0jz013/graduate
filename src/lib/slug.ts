/**
 * Vietnamese name → URL slug. "Đào Trọng An" → "dao-trong-an"
 *
 * Authoring helper: slugs are stored explicitly in guests.json so they stay
 * stable, but this generates the right one when adding somebody new.
 */
export function toSlug(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // strip combining diacritics
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
