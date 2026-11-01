import { PageHero, SectionHead, Section, Steps, Reveal, Bullets, ArrowUpRight } from '../components/ui.jsx'
import { LeoneMock } from '../components/Mocks.jsx'

const MAIL = 'mailto:charles@xatmarket.com?subject=LeoneBot%20early%20access'
const Soon = () => <p className="mb-8 inline-flex items-center gap-2 rounded-full border border-amber-300/40 bg-amber-400/15 px-4 py-1.5 text-[14px] font-bold uppercase tracking-widest text-amber-300"><span className="size-2 rounded-full bg-amber-300" />Coming soon · Early access</p>
const MailBtn = ({ ghost }) => <a href={MAIL} className={ghost ? 'btn-ghost' : 'btn-gold'}>Join the early-access list<ArrowUpRight /></a>

const cycle = [
  { title: 'Sleeps', text: 'Most of the time the lion is asleep. It reads the room quietly, without bothering anyone or costing a thing.' },
  { title: 'Roars', text: 'When real trouble starts, it wakes up and roars in the chat, so everyone knows the lion is watching.' },
  { title: 'Guards', text: 'It stays awake and guards its lambs for a while. It removes the people causing the harm and leaves everyone else alone.' },
  { title: 'Sleeps again', text: 'Once the chat calms down, it says goodnight and goes back to sleep.' },
]
const wakes = [
  { name: 'Personal-life attacks', text: 'Going after someone\u2019s family, past, looks, or private details. That is not an argument any more.' },
  { name: 'Pile-ons', text: 'Several people ganging up on someone who is not fighting back. The ringleaders and repeat attackers are removed. People who added one line get a warning first.' },
  { name: 'Ignored stop requests', text: 'Someone asks you to stop, in the chat or privately to the lion, and you keep going. The lion hears it.' },
  { name: 'Crying wolf', text: 'Shouting \u201cstop harassing me\u201d after the other person went quiet, then poking at them again? The lion calls it out and warns you. Keep doing it and you are removed.' },
]
const sleeps = [
  'Venting about a bad day',
  'Heated arguments where both sides give as good as they get',
  'Banter, jokes, and trash talk between friends',
  'Small complaints sent privately. The lion tells you to become stronger.',
]
const safeguards = [
  'Bans need a second, stronger check and a staff confirmation (unless the owner switches on auto-ban)',
  'Staff are never removed automatically. Owners are told, and a person decides.',
  'Every action has a case number. Anyone can !appeal, and staff can !undo with a public correction.',
  'Chat logs are deleted after 7 days. Evidence for a case is kept for 90.',
  'Members can !optout of logging, and a visible notice says the lion is there',
  'Only messages from the moment the lion wakes are checked. Nothing is read beyond your own chat.',
]
const extras = [
  { name: 'DramaScreen engine', text: 'A free first pass reads every message. Only when the lion is awake does a deeper AI check run, first a quick model and then a stronger one for borderline cases. Quotes must match what was really said, word for word.' },
  { name: 'Games while it rests', text: 'Trivia, bingo, hangman, and word scramble, hosted automatically with scoreboards. Keeps the chat lively.' },
  { name: 'Moderation tools', text: 'Kick, ban, mute, and rank commands, filters for bad words, links, caps, and flooding, plus automember.' },
  { name: 'Pay in xats', text: 'Send xats by transfer and the time is added automatically. Auto-renew keeps the lion on duty without reminders.' },
]

export default function LeoneBot() {
  return (
    <>
      <PageHero kicker="Market / Services · LeoneBot" title="The lion" accent="that guards your chat.">
        <Soon />
        <p className="lede">LeoneBot sleeps until real trouble starts. Then it wakes, roars, and guards the chat to defend its lambs. When things calm down, it goes back to sleep.</p>
        <p className="mt-6 font-display text-2xl font-semibold text-goldsoft">Non-invasive · Does not coddle · $5/month</p>
        <div className="mt-9 flex flex-wrap gap-3"><MailBtn /><a href="#how" className="btn-ghost">How it works</a></div>
      </PageHero>

      <Section id="how" tone="b">
        <SectionHead kicker="A lion, not a nanny" title="Sleep. Roar. Guard. Sleep." />
        <div className="mt-14"><Steps items={cycle} cols={2} /></div>
      </Section>

      <Section tone="c">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal className="min-w-0">
            <p className="eyebrow">It does not coddle</p>
            <h2 className="h2 mt-4">Venting is fine.<br /><em className="text-gold">Become stronger.</em></h2>
            <p className="lede mt-7">Most drama is just people being people. The lion stays asleep for:</p>
            <div className="mt-6"><Bullets items={sleeps} /></div>
          </Reveal>
          <Reveal delay={120} className="min-w-0"><LeoneMock /></Reveal>
        </div>
      </Section>

      <Section tone="b">
        <SectionHead kicker="What wakes the lion" title="Real trouble, not hurt feelings." />
        <div className="mt-16 grid border-t border-white/[.08] md:grid-cols-2">
          {wakes.map((it, k) => (
            <Reveal as="article" key={it.name} delay={(k % 2) * 60} className={`border-b border-white/[.08] py-10 ${k % 2 === 0 ? 'md:border-r md:pr-12' : 'md:pl-12'}`}>
              <h3 className="font-display text-4xl text-cream">{it.name}</h3>
              <p className="copy mt-3 text-[16px]">{it.text}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="a">
        <SectionHead kicker="Fair by design" title="Safeguards" />
        <div className="mt-12 max-w-3xl"><Bullets items={safeguards} /></div>
      </Section>

      <Section tone="b">
        <SectionHead kicker="Under the mane" title="What comes with it" />
        <div className="mt-16 grid border-t border-white/[.08] md:grid-cols-2">
          {extras.map((it, k) => (
            <Reveal as="article" key={it.name} delay={(k % 2) * 60} className={`border-b border-white/[.08] py-10 ${k % 2 === 0 ? 'md:border-r md:pr-12' : 'md:pl-12'}`}>
              <h3 className="font-display text-4xl text-cream">{it.name}</h3>
              <p className="copy mt-3 text-[16px]">{it.text}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="c">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="min-w-0">
            <p className="eyebrow">Planned pricing</p>
            <h2 className="h2 mt-4">One plan.<br /><em className="text-gold">No surprises.</em></h2>
            <p className="lede mt-7">Paid checks only run while the lion is awake, so quiet chats use almost nothing. Unused credits roll over to the next month.</p>
          </Reveal>
          <Reveal delay={120} className="dcard hot min-w-0 p-8 sm:p-10">
            <p className="font-mono text-[11.5px] font-bold uppercase tracking-widest text-mint">LeoneBot</p>
            <p className="mt-3 font-display text-6xl font-extrabold text-sun">$5<span className="font-sans text-base text-mist"> / month</span></p>
            <ul className="mt-7 space-y-3 border-t border-white/[.08] pt-6">
              {['600 drama credits each month', 'Unused credits roll over', 'Low-balance alerts to the owner', 'Pay in xats, with auto-renew', 'Games and moderation tools included'].map((p) => <li key={p} className="flex gap-3 text-[15px] text-cream/85"><span className="mt-[11px] h-px w-3 shrink-0 bg-mint" />{p}</li>)}
            </ul>
            <p className="mt-6 text-[13.5px] leading-6 text-mist">Proposed pricing. Not on sale yet.</p>
          </Reveal>
        </div>
      </Section>

      <section className="invite tone-c relative isolate overflow-hidden">
        <div className="invite-sea" aria-hidden="true" />
        <Reveal className="wrap relative text-center">
          <p className="eyebrow justify-center">Coming soon · Early access</p>
          <h2 className="h-display mx-auto mt-4 max-w-4xl text-[44px] sm:text-[68px]">Want the lion in your chat?</h2>
          <p className="lede mx-auto mt-6 max-w-2xl">LeoneBot is not live yet. Email Charles with your chat name and we will reach out when early access opens.</p>
          <div className="mt-9 flex justify-center"><MailBtn /></div>
          <p className="mt-4 text-sm text-white/75">charles@xatmarket.com · Nothing is booked or paid for on this page.</p>
        </Reveal>
      </section>
    </>
  )
}
