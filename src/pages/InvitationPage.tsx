import { useEffect } from 'react'
import { useParams } from 'react-router'
import { CalendarButtons } from '../components/CalendarButtons'
import { Countdown } from '../components/Countdown'
import { DetailsGrid } from '../components/DetailsGrid'
import { GuestAddress } from '../components/GuestAddress'
import { Hero } from '../components/Hero'
import { Letter } from '../components/Letter'
import { GoldRule } from '../components/Ornaments'
import { PersonalNote } from '../components/PersonalNote'
import { PhotoMoment } from '../components/PhotoMoment'
import { RsvpBar } from '../components/RsvpBar'
import { TicketStub } from '../components/TicketStub'
import { VenueMap } from '../components/VenueMap'
import { EVENT } from '../data/event'
import { GUESTS, findGuest } from '../data/guests'

export function InvitationPage() {
  const { slug } = useParams()
  const guest = findGuest(slug)

  // The prerendered HTML already carries the right title; this keeps the dev
  // server and any in-app navigation honest.
  useEffect(() => {
    document.title = guest
      ? `${guest.name} · The Graduation of ${EVENT.graduate.name}`
      : `The Graduation of ${EVENT.graduate.name}`
  }, [guest])

  const index = guest ? GUESTS.indexOf(guest) + 1 : 0
  const seat = guest ? `No. ${String(index).padStart(3, '0')}` : 'Guest'

  return (
    <main className="ember-field grain relative min-h-dvh overflow-hidden">
      <Hero />

      <div className="relative mx-auto max-w-[38rem] px-4 pb-14 sm:px-6 sm:pb-20 lg:max-w-6xl lg:pb-24">
        {/*
          On a wide screen the card opens into a bi-fold spread, the way a
          printed invitation actually does: the left page carries the message,
          the right page everything you need in order to turn up.
        */}
        <article className="paper gold-frame animate-rise relative rounded-2xl px-6 py-10 sm:px-10 sm:py-12 lg:grid lg:grid-cols-2 lg:px-0 lg:py-0">
          {/* the crease down the middle of an opened card */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-10 left-1/2 hidden w-16 -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgba(120,60,10,0.055)_42%,rgba(120,60,10,0.055)_58%,transparent)] lg:block"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-14 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-gold-500/40 to-transparent lg:block"
          />

          {/* left page — the message */}
          <div className="space-y-9 sm:space-y-11 lg:px-12 lg:py-14 xl:px-14">
            <GuestAddress guest={guest} />
            <GoldRule tone="dark" />
            <Letter guest={guest} />
            <PersonalNote note={guest?.note} />
            <PhotoMoment />
          </div>

          {/* right page — how to be there */}
          <div className="mt-9 space-y-9 sm:mt-11 sm:space-y-11 lg:mt-0 lg:px-12 lg:py-14 xl:px-14">
            <Countdown />
            <DetailsGrid />
            <VenueMap />
            <CalendarButtons />
            <RsvpBar guest={guest} />
          </div>
        </article>

        <div className="mx-auto mt-7 max-w-[38rem] sm:mt-9">
          <TicketStub guest={guest} seat={seat} />
        </div>

        <footer className="mt-10 text-center lg:mt-12">
          <p className="font-script text-2xl text-gold-200 lg:text-3xl">
            See you on the sixteenth
          </p>
          <p className="mt-2 text-[0.68rem] uppercase tracking-[0.28em] text-cream-50/60">
            {EVENT.school} · {EVENT.cohort}
          </p>
        </footer>
      </div>
    </main>
  )
}
