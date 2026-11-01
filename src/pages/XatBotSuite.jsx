import { PageHero, SectionHead, Section, Steps, Reveal, Bullets, ArrowUpRight } from '../components/ui.jsx'
import { LeoneMock } from '../components/Mocks.jsx'
import Calculator from '../components/Calculator.jsx'
import { usdToXats, xatsPerUsd, packs, DEFAULT_PACK, RATE, fmt } from '../xatRate.js'

// The plan is set at $5/month and shown in xats using the same rate as the Xat value calculator.
const PLAN_USD = 5, PLAN_CREDITS = 600
const PLAN_XATS = usdToXats(PLAN_USD)
const creditPacks = [300, 600, 1200].map((c) => ({ credits: c, xats: usdToXats((c * PLAN_USD) / PLAN_CREDITS) }))
const ref = packs[DEFAULT_PACK]

const MAIL = 'mailto:charles@xatmarket.com?subject=XatBot%20Suite%20early%20access'
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
  { name: 'Moderation tools', text: 'Kick, ban, mute, and rank commands, filters for bad words, links, caps, and flooding, plus automember.' },
  { name: 'Pay in xats', text: 'Send xats by transfer and the time is added automatically. Auto-renew keeps the lion on duty without reminders.' },
]

const playPacks = [100, 250, 500].map((c) => ({ credits: c, xats: usdToXats((c * PLAN_USD) / PLAN_CREDITS) }))
const arcade = [
  { name: 'Chess', cost: 5, text: 'Full rules (castling, en passant, promotion). Easy, medium, or hard AI.' },
  { name: 'Checkers', cost: 3, text: 'Forced captures, multi-jumps, and kings.' },
  { name: 'Battleship', cost: 3, text: '6×6 sea, three ships, and a lion that hunts your hits.' },
  { name: 'Connect Four', cost: 2, text: 'Looks ahead several moves on hard. Good luck.' },
  { name: 'Tic-tac-toe', cost: 1, text: 'On hard it never loses. Can you force a draw?' },
  { name: 'Blackjack', cost: 1, text: 'Hit or stand. The dealer draws to 17.' },
  { name: 'Hangman & word scramble', cost: 1, text: 'Quick word games for a spare minute.' },
]
const hostFeatures = [
  { name: 'Challenge LeoneHost', text: 'Private-chat games against the bot: chess, checkers, battleship, connect four, and more. Boards show as text in PC and in the Canvas panel, with ELO ratings and leaderboards.' },
  { name: 'Games panel', text: 'Trivia, bingo, hangman, word scramble, and smiley-matching drawn live in xat\u2019s Canvas side panel (AppBot), with scoreboards and leaderboards.' },
  { name: 'Events', text: 'LeoneHost runs game nights, quiz rounds, and \u201cmod of the month\u201d votes on a schedule, so the chat always has something going on.' },
  { name: 'Polls', text: 'Live xat-style bar charts in the Canvas panel. Everyone votes, everyone sees the result move.' },
  { name: 'Fun commands', text: '!8ball, !horoscope by sign, !dice, !coinflip, !ship compatibility, !wyr (would you rather), !roast (playful, never cruel), !fortune, and !trivia.' },
  { name: 'Heat meter', text: 'A live DramaScreen meter in the panel. It stays calm while the room is fine and lights up when LeoneGuard wakes.' },
  { name: 'Credits panel', text: 'Owners see the plan time and drama credits left, right in the chat. Display only. Payment still happens by xat transfer.' },
]
const together = [
  { title: 'Guard wakes', text: 'LeoneGuard spots real trouble and roars.' },
  { title: 'Host reacts', text: 'LeoneHost lights up the heat meter and pauses any game in progress.' },
  { title: 'Guard handles it', text: 'The people causing harm are dealt with. Everyone else is left alone.' },
  { title: 'Fun resumes', text: 'When LeoneGuard goes back to sleep, LeoneHost cools the meter and picks the game up where it left off.' },
]
const Card = ({ items }) => (
  <div className="mt-16 grid border-t border-white/[.08] md:grid-cols-2">
    {items.map((it, k) => (
      <Reveal as="article" key={it.name} delay={(k % 2) * 60} className={`border-b border-white/[.08] py-10 ${k % 2 === 0 ? 'md:border-r md:pr-12' : 'md:pl-12'}`}>
        <h3 className="font-display text-4xl text-cream">{it.name}</h3>
        <p className="copy mt-3 text-[16px]">{it.text}</p>
      </Reveal>
    ))}
  </div>
)

export default function XatBotSuite() {
  return (
    <>
      <PageHero kicker="Market / Services · XatBot Suite" title="XatBot Suite" accent="two bots, one pride.">
        <Soon />
        <p className="lede"><b className="text-cream">LeoneGuard</b> protects the chat and its users. <b className="text-cream">LeoneHost</b> hosts the games, events, and fun commands. Way funner than the usual chat bots. They work together, so the fun stops when trouble starts and comes back when it is over.</p>
        <p className="mt-6 font-display text-2xl font-semibold text-goldsoft">LeoneGuard + LeoneHost · {fmt(PLAN_XATS)} xats/month</p>
        <div className="mt-9 flex flex-wrap gap-3"><MailBtn /><a href="#guard" className="btn-ghost">LeoneGuard</a><a href="#host" className="btn-ghost">LeoneHost</a></div>
      </PageHero>

      <Section id="guard" tone="b">
        <SectionHead kicker="LeoneGuard · protects the chat and users" title="Sleep. Roar. Guard. Sleep.">LeoneGuard sleeps until real trouble starts. Then it wakes, roars, and guards the chat to defend its lambs. When things calm down, it goes back to sleep.</SectionHead>
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
        <SectionHead kicker="LeoneGuard · under the mane" title="What LeoneGuard brings" />
        <Card items={extras} />
      </Section>

      <Section id="host" tone="c">
        <SectionHead kicker="LeoneHost · games, events, fun" title="The fun one.">LeoneHost uses xat’s AppBot power and the Canvas side panel to run games and events you can see and play, not just read.</SectionHead>
        <Card items={hostFeatures} />
      </Section>

      <Section id="arcade" tone="b">
        <SectionHead kicker="LeoneHost arcade · early access" title="Challenge the lion.">Message LeoneHost in private chat, type <code className="font-mono text-mint">!play chess hard</code>, and play. Each game uses a few play credits. Wins and losses move your ELO for that game, and the best players reach the leaderboard.</SectionHead>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {arcade.map((g) => (
            <Reveal key={g.name} className="dcard min-w-0 p-6">
              <div className="flex items-baseline justify-between gap-3"><h3 className="font-display text-xl text-cream">{g.name}</h3><span className="font-mono text-[12px] font-bold text-sun">{g.cost} credit{g.cost > 1 ? 's' : ''}</span></div>
              <p className="mt-2 text-[14.5px] leading-6 text-mist">{g.text}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="dcard mt-8 p-6 sm:p-8">
          <p className="font-mono text-[11.5px] font-bold uppercase tracking-widest text-mint">Play credits · priced in xats</p>
          <ul className="mt-4 grid grid-cols-3 gap-2">
            {playPacks.map((k) => <li key={k.credits} className="rounded-xl border border-white/10 bg-ink/40 p-3 text-center"><span className="block font-display text-2xl text-cream tabular-nums">{fmt(k.xats)}</span><span className="text-[12px] text-mist">xats · {fmt(k.credits)} play credits</span></li>)}
          </ul>
          <p className="mt-4 text-[13.5px] leading-6 text-mist">Hard mode costs 50% more. Play credits are a separate balance from drama credits but use the same rate, converted with the calculator below. Bought by sending xats to LeoneHost. Proposed pricing, early access only. Not on sale yet.</p>
        </Reveal>
      </Section>

      <Section tone="c">
        <SectionHead kicker="Two bots, one pride" title="How they work together" />
        <div className="mt-14"><Steps items={together} cols={2} /></div>
      </Section>

      <Section tone="c">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="min-w-0">
            <p className="eyebrow">Planned pricing</p>
            <h2 className="h2 mt-4">One plan.<br /><em className="text-gold">No surprises.</em></h2>
            <p className="lede mt-7">Paid checks only run while the lion is awake, so quiet chats use almost nothing. Unused credits roll over to the next month.</p>
          </Reveal>
          <Reveal delay={120} className="dcard hot min-w-0 p-8 sm:p-10">
            <p className="font-mono text-[11.5px] font-bold uppercase tracking-widest text-mint">XatBot Suite · LeoneGuard + LeoneHost</p>
            <p className="mt-3 font-display text-6xl font-extrabold text-sun tabular-nums">{fmt(PLAN_XATS)}<span className="font-sans text-base text-mist"> xats / month</span></p>
            <ul className="mt-7 space-y-3 border-t border-white/[.08] pt-6">
              {[`${PLAN_CREDITS} drama credits each month`, 'Unused credits roll over', 'Low-balance alerts to the owner', 'Pay in xats, with auto-renew', 'Both bots included'].map((p) => <li key={p} className="flex gap-3 text-[15px] text-cream/85"><span className="mt-[11px] h-px w-3 shrink-0 bg-mint" />{p}</li>)}
            </ul>
            <p className="mt-7 border-t border-white/[.08] pt-6 text-[13px] font-semibold text-cream/90">Extra credit packs</p>
            <ul className="mt-3 grid grid-cols-3 gap-2">
              {creditPacks.map((k) => <li key={k.credits} className="rounded-xl border border-white/10 bg-ink/40 p-3 text-center"><span className="block font-display text-2xl text-cream tabular-nums">{fmt(k.xats)}</span><span className="text-[12px] text-mist">xats · {fmt(k.credits)} credits</span></li>)}
            </ul>
            <p className="mt-6 text-[13.5px] leading-6 text-mist">Proposed pricing. Not on sale yet. Xats figures come from the Xat value calculator below: the {fmt(ref.usd)} USD store pack is worth {fmt(ref.xats)} xats + {fmt(ref.days)} days × {RATE} = {fmt(ref.xats + ref.days * RATE)} xats, or {xatsPerUsd().toFixed(1)} xats per US dollar. The plan is set at {PLAN_USD} USD a month.</p>
          </Reveal>
        </div>
      </Section>

      <Section tone="b">
        <SectionHead kicker="Same calculator as Advertising" title="How we get the xats price">The XatBot Suite price uses the Market's own Xat value calculator. Try a store pack to see what it is worth in xats.</SectionHead>
        <Reveal className="mt-14"><Calculator /></Reveal>
      </Section>

      <section className="invite tone-c relative isolate overflow-hidden">
        <div className="invite-sea" aria-hidden="true" />
        <Reveal className="wrap relative text-center">
          <p className="eyebrow justify-center">Coming soon · Early access</p>
          <h2 className="h-display mx-auto mt-4 max-w-4xl text-[44px] sm:text-[68px]">Want the pride in your chat?</h2>
          <p className="lede mx-auto mt-6 max-w-2xl">XatBot Suite is not live yet. Email Charles with your chat name and we will reach out when early access opens.</p>
          <div className="mt-9 flex justify-center"><MailBtn /></div>
          <p className="mt-4 text-sm text-white/75">charles@xatmarket.com · Nothing is booked or paid for on this page.</p>
        </Reveal>
      </section>
    </>
  )
}
