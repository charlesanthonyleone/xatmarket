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

const guardCmds = [['!appeal <case>', 'ask staff to review an action'], ['!optout', 'stop logging your messages'], ['!kick / !ban / !mute', 'staff moderation, rank checked'], ['!undo <case>', 'staff overturn with a public correction'], ['!badword / !links', 'chat filters'], ['PC the lion', 'report someone who will not stop']]
const hostCmds = [['!8ball · !fortune', 'ask the lion anything'], ['!horoscope <sign>', 'same reading all day'], ['!dice 2d6 · !flip', 'roll or toss'], ['!ship a b · !wyr', 'compatibility, would you rather'], ['!roast', 'playful, never cruel'], ['!trivia · !poll q | a | b', 'room games and live polls'], ['!play chess hard', 'challenge LeoneHost in PC'], ['!stats · !leaderboard', 'your ELO and the top players']]

const Code = ({ children }) => <code className="rounded-md border border-white/10 bg-ink/80 px-1.5 py-0.5 font-mono text-[0.9em] font-semibold text-sun">{children}</code>

const SIDES = {
  guard: { name: 'LeoneGuard', role: 'Protection', dot: 'bg-mint', text: 'text-mint', ring: 'border-mint/25' },
  host: { name: 'LeoneHost', role: 'Fun', dot: 'bg-sun', text: 'text-sun', ring: 'border-sun/25' },
}
const Tag = ({ side, className = '' }) => (
  <p className={`inline-flex items-center gap-2 font-mono text-[11.5px] font-bold uppercase tracking-widest ${SIDES[side].text} ${className}`}><span className={`size-2 rounded-full ${SIDES[side].dot}`} />{SIDES[side].name} · {SIDES[side].role}</p>
)
/** One aligned comparison row: Guard on the left, Host on the right. Stacks Guard → Host on mobile. */
const Pair = ({ n, label, guard, host, tone = 'b', id }) => (
  <Section id={id} tone={tone}>
    <Reveal className="flex items-baseline gap-4 border-b border-white/[.08] pb-5">
      <span className="font-mono text-[13px] font-bold text-mist">{String(n).padStart(2, '0')}</span>
      <h2 className="font-display text-3xl text-cream sm:text-4xl">{label}</h2>
    </Reveal>
    <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:gap-0">
      <Reveal className={`dcard min-w-0 border ${SIDES.guard.ring} p-6 sm:p-8 lg:rounded-r-none`}><Tag side="guard" className="mb-5" />{guard}</Reveal>
      <Reveal delay={80} className={`dcard min-w-0 border ${SIDES.host.ring} p-6 sm:p-8 lg:rounded-l-none lg:border-l-0`}><Tag side="host" className="mb-5" />{host}</Reveal>
    </div>
  </Section>
)
const H = ({ children }) => <h3 className="font-display text-2xl text-cream sm:text-[28px]">{children}</h3>
const P = ({ children }) => <p className="copy mt-3 text-[15.5px]">{children}</p>
const List = ({ items }) => (
  <dl className="mt-5 divide-y divide-white/[.07] border-y border-white/[.07]">
    {items.map((it) => <div key={it.name || it.title} className="py-4"><dt className="font-semibold text-cream">{it.name || it.title}</dt><dd className="mt-1 text-[14.5px] leading-6 text-mist">{it.text}</dd></div>)}
  </dl>
)
const Cmds = ({ items }) => (
  <ul className="mt-5 space-y-3">
    {items.map(([c, t]) => <li key={c} className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4"><span className="shrink-0 sm:w-48"><Code>{c}</Code></span><span className="text-[14.5px] text-mist">{t}</span></li>)}
  </ul>
)
const Packs = ({ items, unit }) => (
  <ul className="mt-5 grid grid-cols-3 gap-2">
    {items.map((k) => <li key={k.credits} className="rounded-xl border border-white/10 bg-ink/40 p-3 text-center"><span className="block font-display text-2xl text-cream tabular-nums">{fmt(k.xats)}</span><span className="text-[12px] text-mist">xats · {fmt(k.credits)} {unit}</span></li>)}
  </ul>
)

export default function XatBotSuite() {
  return (
    <>
      <PageHero kicker="Market / Services · XatBot Suite" title="XatBot Suite" accent="two bots, one pride.">
        <Soon />
        <p className="lede"><b className="text-mint">LeoneGuard</b> protects the chat and its users. <b className="text-sun">LeoneHost</b> hosts the games, events, and fun commands. Read them side by side below: protection on the left, fun on the right.</p>
        <p className="mt-6 font-display text-2xl font-semibold text-goldsoft">LeoneGuard + LeoneHost · {fmt(PLAN_XATS)} xats/month</p>
        <div className="mt-9 flex flex-wrap gap-3"><MailBtn /><a href="#compare" className="btn-ghost">Compare the two bots</a></div>
      </PageHero>

      <div id="compare" className="sticky top-0 z-30 hidden border-y border-white/[.08] bg-ink/90 backdrop-blur lg:block">
        <div className="wrap grid grid-cols-2 py-3"><Tag side="guard" /><Tag side="host" className="pl-8" /></div>
      </div>

      <Pair n={1} label="Who it is" tone="b"
        guard={<><H>The sleeping lion.</H><P>LeoneGuard sleeps until real trouble starts. Then it wakes, roars, and guards its lambs. When the chat calms down it says goodnight and sleeps again.</P><List items={cycle} /></>}
        host={<><H>The fun one.</H><P>LeoneHost is the same lion off duty. It uses xat’s AppBot power and the Canvas side panel to run games and events you can see and play, not just read. Way funner than the usual chat bots.</P><div className="mt-6"><LeoneMock /></div></>} />

      <Pair n={2} label="What it does" tone="c"
        guard={<><H>Wakes for real trouble, not hurt feelings.</H><List items={wakes} /><p className="mt-6 font-semibold text-cream">It stays asleep for:</p><div className="mt-3"><Bullets items={sleeps} /></div></>}
        host={<><H>Keeps the room busy.</H><List items={hostFeatures.filter((f) => ['Games panel', 'Events', 'Polls', 'Heat meter'].includes(f.name))} /></>} />

      <Pair n={3} label="Key features" tone="b"
        guard={<><H>Under the mane.</H><List items={extras} /><p className="mt-6 font-semibold text-cream">Safeguards</p><div className="mt-3"><Bullets items={safeguards} /></div></>}
        host={<><H>Challenge the lion.</H><P>Message LeoneHost in private chat, type <Code>!play chess hard</Code>, and play. Wins and losses move your ELO for that game, and the best players reach the leaderboard.</P>
          <ul className="mt-5 divide-y divide-white/[.07] border-y border-white/[.07]">
            {arcade.map((g) => <li key={g.name} className="flex items-baseline justify-between gap-4 py-3"><span><span className="font-semibold text-cream">{g.name}</span><span className="block text-[14px] leading-6 text-mist">{g.text}</span></span><span className="shrink-0 font-mono text-[12px] font-bold text-sun">{g.cost} credit{g.cost > 1 ? 's' : ''}</span></li>)}
          </ul>
          <List items={hostFeatures.filter((f) => ['Fun commands', 'Credits panel'].includes(f.name))} /></>} />

      <Pair n={4} label="Commands" tone="c"
        guard={<><H>Fair, with a way to appeal.</H><Cmds items={guardCmds} /></>}
        host={<><H>Type it and play.</H><Cmds items={hostCmds} /></>} />

      <Section tone="b">
        <SectionHead kicker="Shared · two bots, one pride" title="How they work together">When LeoneGuard wakes, LeoneHost’s heat meter lights up and any game pauses. When Guard sleeps again, the fun picks up where it left off.</SectionHead>
        <div className="mt-14"><Steps items={together} cols={2} /></div>
      </Section>

      <Pair n={5} label="Credits & pricing in xats" tone="c" id="pricing"
        guard={<><H>Drama credits.</H><p className="mt-3 font-display text-5xl font-extrabold text-sun tabular-nums">{fmt(PLAN_XATS)}<span className="font-sans text-base text-mist"> xats / month for the suite</span></p><P>{PLAN_CREDITS} drama credits a month. Paid checks only run while the lion is awake, so quiet chats use almost nothing. Unused credits roll over, and the owner gets low-balance alerts.</P><p className="mt-6 text-[13px] font-semibold text-cream/90">Extra drama-credit packs</p><Packs items={creditPacks} unit="credits" /></>}
        host={<><H>Play credits.</H><P>A separate balance at the same rate, bought by sending xats to LeoneHost. Each arcade game uses a few. Hard mode costs 50% more. Room games, fun commands, and polls are included with the plan.</P><p className="mt-6 text-[13px] font-semibold text-cream/90">Play-credit packs</p><Packs items={playPacks} unit="play credits" /></>} />

      <Section tone="b">
        <SectionHead kicker="Same calculator as Advertising" title="How we get the xats price">Proposed pricing, not on sale yet. The {fmt(ref.usd)} USD store pack is worth {fmt(ref.xats)} xats + {fmt(ref.days)} days × {RATE} = {fmt(ref.xats + ref.days * RATE)} xats, or {xatsPerUsd().toFixed(1)} xats per US dollar. The plan is set at {PLAN_USD} USD a month.</SectionHead>
        <Reveal className="mt-14"><Calculator /></Reveal>
      </Section>

      <Pair n={6} label="Early access" tone="c"
        guard={<><H>Not live yet.</H><P>LeoneGuard is in testing. No chat is protected by it today, and nothing on this page has been sold.</P></>}
        host={<><H>Not live yet.</H><P>LeoneHost and the arcade are in testing too. Leaderboards start empty when early access opens.</P></>} />

      <section className="invite tone-c relative isolate overflow-hidden">
        <div className="invite-sea" aria-hidden="true" />
        <Reveal className="wrap relative text-center">
          <p className="eyebrow justify-center">Coming soon · Early access</p>
          <h2 className="h-display mx-auto mt-4 max-w-4xl text-[44px] sm:text-[68px]">Want the pride in your chat?</h2>
          <p className="lede mx-auto mt-6 max-w-2xl">Email Charles with your chat name and we will reach out when early access opens.</p>
          <div className="mt-9 flex justify-center"><MailBtn /></div>
          <p className="mt-4 text-sm text-white/75">charles@xatmarket.com · Nothing is booked or paid for on this page.</p>
        </Reveal>
      </section>
    </>
  )
}
