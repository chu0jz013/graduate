import { EVENT } from '../data/event'
import { Embers, GoldRule, Mortarboard } from './Ornaments'

export function Hero() {
  return (
    <header className="relative isolate overflow-hidden px-6 pt-14 pb-16 text-center sm:pt-20 sm:pb-24 lg:pt-28 lg:pb-32">
      <Embers />

      {/* the warm bloom the poster puts behind the cap */}
      <div
        className="animate-breathe pointer-events-none absolute left-1/2 top-20 -z-10 size-64 -translate-x-1/2 rounded-full bg-gold-200/40 blur-3xl sm:size-80 lg:top-28 lg:size-96"
        aria-hidden="true"
      />

      {/* the concentric ground rings from the poster, barely there */}
      <svg
        viewBox="0 0 400 400"
        className="pointer-events-none absolute left-1/2 top-10 -z-10 hidden w-[24rem] -translate-x-1/2 opacity-20 sm:block lg:top-16 lg:w-[32rem]"
        fill="none"
        stroke="#FFF1DC"
        aria-hidden="true"
      >
        <circle cx="200" cy="200" r="150" strokeWidth="1" />
        <circle cx="200" cy="200" r="178" strokeWidth="1" strokeDasharray="2 11" />
        <circle cx="200" cy="200" r="118" strokeWidth="0.75" strokeDasharray="1 8" />
      </svg>

      <p className="animate-rise text-[0.6rem] font-medium uppercase tracking-[0.38em] text-cream-50/80 sm:text-xs lg:text-[0.78rem]">
        {EVENT.school} · {EVENT.cohort}
      </p>

      <Mortarboard className="animate-rise mx-auto mt-8 w-32 drop-shadow-[0_14px_28px_rgba(120,40,0,0.5)] sm:mt-10 sm:w-44 lg:mt-12 lg:w-52" />

      <GoldRule className="mt-9 sm:mt-11 lg:mt-14" />

      <p className="mt-6 text-[0.65rem] uppercase tracking-[0.34em] text-cream-50/85 sm:text-xs lg:mt-8 lg:text-sm">
        The graduation of
      </p>
      <h1 className="embossed mt-3 font-display text-[2.75rem] leading-[1.05] font-semibold text-cream-50 sm:text-7xl lg:mt-4 lg:text-8xl">
        {EVENT.graduate.name}
      </h1>

      <GoldRule className="mt-7 sm:mt-9 lg:mt-11" />

      <p className="mt-6 font-script text-2xl leading-tight text-cream-100 sm:text-4xl lg:mt-8 lg:text-5xl">
        {EVENT.tagline}
      </p>
    </header>
  )
}
