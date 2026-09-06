import { GoldRule } from './Ornaments'

/** The one line written for this guest alone. Nothing renders without it. */
export function PersonalNote({ note }: { note?: string }) {
  if (!note) return null

  return (
    <div className="text-center">
      <GoldRule tone="dark" />
      <p className="mx-auto mt-6 max-w-sm font-script text-2xl leading-snug text-ember-800 sm:text-[1.75rem]">
        {note}
      </p>
      <GoldRule tone="dark" className="mt-6" />
    </div>
  )
}
